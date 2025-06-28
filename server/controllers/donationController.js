
import DonationModel from "../models/DonationModel.js";
import TaskModel from "../models/TaskModel.js";
import { sendDonationClaimedEmail } from '../services/emailService.js';
import UserModel from "../models/UserModel.js";



const addDonation = async (req, res) => {
    
    let imageUrl = "";

    if (req.file) {      
        imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    } else {        
        imageUrl = req.body.imageUrl;
    }

    let quantity;
    try {
        quantity = JSON.parse(req.body.quantity);
    } catch (e) {
        quantity = req.body.quantity;
    }

    const newDonation = new DonationModel({
        donorId: req.userId,
        title: req.body.title,
        type: req.body.type,
        category: req.body.category,
        pickupInstructions: req.body.pickupInstructions,
        quantity: quantity,
        imageUrl: imageUrl,
    });

    try {
        await newDonation.save();
        res.status(201).json({ success: true, message: "Donation listed successfully." });
    } catch (error) {
        console.error("Error adding donation:", error);
        res.status(500).json({ success: false, message: "An error occurred while listing the donation." });
    }
};
const listDonorDonations = async (req, res) => {
    try {
        const donations = await DonationModel.find({ donorId: req.userId })
            .populate('claimedByReceiverId', 'fullName roleDetails.organizationName'); 

        res.json({ success: true, data: donations });
    } catch (error) {
        console.error("Error listing donor donations:", error);
        res.json({ success: false, message: "An error occurred while fetching your donations." });
    }
};

const removeDonation = async (req, res) => {
    try {
        const donation = await DonationModel.findById(req.body.id);
        if (donation.donorId.toString() !== req.userId) {
            return res.status(403).json({ success: false, message: "Unauthorized." });
        }
        await DonationModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Donation removed." });
    } catch (error) {
        console.error("Error removing donation:", error);
        res.status(500).json({ success: false, message: "Error removing donation." });
    }
};

const updateDonationQuantity = async (req, res) => {
    try {
        const { donationId, newQuantity } = req.body;
        const donation = await DonationModel.findById(donationId);
        if (donation.donorId.toString() !== req.userId) {
            return res.status(403).json({ success: false, message: "Unauthorized." });
        }
        if (donation.type !== 'Cooked') {
            return res.status(400).json({ success: false, message: "Quantity only updatable for 'Cooked' items." });
        }
        donation.quantity = newQuantity;
        await donation.save();
        res.json({ success: true, message: "Quantity updated." });
    } catch (error) {
        console.error("Error updating quantity:", error);
        res.status(500).json({ success: false, message: "Error updating quantity." });
    }
};

const getDonorStats = async (req, res) => {
    try {
        const donorId = req.userId;
        const totalDonations = await DonationModel.countDocuments({ donorId });
        const completedDonations = await DonationModel.countDocuments({ donorId, status: 'Completed' });
        const claimedDonations = await DonationModel.countDocuments({ donorId, status: 'Claimed' });
        const availableDonations = await DonationModel.countDocuments({ donorId, status: 'Available' });

        res.json({
            success: true,
            stats: {
                total: totalDonations,
                completed: completedDonations,
                claimed: claimedDonations,
                available: availableDonations
            }
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({ success: false, message: "Error fetching stats." });
    }
};



const listAvailableDonations = async (req, res) => {
    try {
       const donations = await DonationModel.find({ status: 'Available' })
            .populate('donorId', 'fullName roleDetails.organizationName address');
        res.json({ success: true, data: donations });
    } catch (error) {
        console.error("Error listing available donations:", error);
        res.json({ success: false, message: "An error occurred while fetching donations." });
    }
};


const claimDonation = async (req, res) => {
    try {
        const donation = await DonationModel.findById(req.body.donationId);

         const receiver = await UserModel.findById(req.userId);

        if (!donation) {
            return res.status(404).json({ success: false, message: "Donation not found." });
        }
        if (donation.status !== 'Available') {
            return res.status(400).json({ success: false, message: "This donation has already been claimed." });
        }

        donation.status = 'Claimed';
        donation.claimedByReceiverId = req.userId;
        await donation.save();

        await new TaskModel({
            donationId: donation._id,
            urgency: 'Today'
        }).save();

          await sendDonationClaimedEmail(donation.donorId, receiver, donation);

        res.json({ success: true, message: "Donation claimed successfully! A task has been created for volunteers." });

    } catch (error) {
        console.error("Error claiming donation:", error);
        res.status(500).json({ success: false, message: "An error occurred." });
    }
};




const listClaimedDonations = async (req, res) => {
    try {
       
        const query = { claimedByReceiverId: req.userId };      
        if (req.query.status) {
            query.status = req.query.status;
        }
        const donations = await DonationModel.find(query).populate('donorId', 'fullName roleDetails.organizationName');
        res.json({ success: true, data: donations });
    } catch (error) {
        console.error("Error listing claimed donations:", error);
        res.json({ success: false, message: "An error occurred while fetching your claimed items." });
    }
};

const getReceiverStats = async (req, res) => {
    try {
        const receiverId = req.userId;  
        const totalClaimed = await DonationModel.countDocuments({ claimedByReceiverId: receiverId });      
        const awaitingPickup = await DonationModel.countDocuments({
            claimedByReceiverId: receiverId,
            status: 'Claimed' 
        });

        res.json({
            success: true,
            stats: {
                total: totalClaimed,
                pickup: awaitingPickup,
            }
        });
    } catch (error) {
        console.error("Error fetching receiver stats:", error);
        res.status(500).json({ success: false, message: "Error fetching activity summary." });
    }
};

export {
    addDonation,
    listDonorDonations,
    removeDonation,
    updateDonationQuantity,
    getDonorStats,
    listAvailableDonations,
    claimDonation,
    listClaimedDonations,
    getReceiverStats
};