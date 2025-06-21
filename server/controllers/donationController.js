// import DonationModel from "../models/DonationModel.js";

// // --- ADD A NEW DONATION ---
// const addDonation = async (req, res) => {
//     // The donor's ID is added to req.body by the authMiddleware
//     const { title, type, category, quantity, pickupInstructions, userId } = req.body;

//     // Create a new donation document using the model
//     const newDonation = new DonationModel({
//         donorId: userId,
//         title,
//         type,
//         category,
//         quantity,
//         pickupInstructions
//         // Image URL would be handled here in a real app after file upload logic
//     });

//     try {
//         await newDonation.save();
//         res.status(201).json({ success: true, message: "Donation listed successfully." });
//     } catch (error) {
//         console.error("Error adding donation:", error);
//         res.status(500).json({ success: false, message: "An error occurred while listing the donation." });
//     }
// };

// // --- LIST DONATIONS FOR A SPECIFIC DONOR ---
// const listDonorDonations = async (req, res) => {
//     try {
//         // Find all donations where the donorId matches the logged-in user's ID
//         const donations = await DonationModel.find({ donorId: req.body.userId });
//         res.json({ success: true, data: donations });
//     } catch (error) {
//         console.error("Error listing donor donations:", error);
//         res.json({ success: false, message: "An error occurred while fetching your donations." });
//     }
// };

// export { addDonation, listDonorDonations };



// import DonationModel from "../models/DonationModel.js";

// // --- ADD A NEW DONATION ---
// const addDonation = async (req, res) => {
//     // The donor's ID is added to req.body by the authMiddleware
//     const { title, type, category, quantity, pickupInstructions, userId } = req.body;

//     const newDonation = new DonationModel({
//         donorId: userId,
//         title,
//         type,
//         category,
//         quantity,
//         pickupInstructions
//         // Image URL would be handled here in a real app after file upload logic
//     });

//     try {
//         await newDonation.save();
//         res.status(201).json({ success: true, message: "Donation listed successfully." });
//     } catch (error) {
//         console.error("Error adding donation:", error);
//         res.status(500).json({ success: false, message: "An error occurred while listing the donation." });
//     }
// };

// // --- LIST DONATIONS FOR A SPECIFIC DONOR ---
// const listDonorDonations = async (req, res) => {
//     try {
//         // Find all donations where the donorId matches the logged-in user's ID
//         // The middleware adds the userId to req.userId
//         const donations = await DonationModel.find({ donorId: req.userId });
//         res.json({ success: true, data: donations });
//     } catch (error) {
//         console.error("Error listing donor donations:", error);
//         res.json({ success: false, message: "An error occurred while fetching your donations." });
//     }
// };

// export { addDonation, listDonorDonations };



// import DonationModel from "../models/DonationModel.js";

// // --- ADD A NEW DONATION ---
// const addDonation = async (req, res) => {
//     // The middleware adds userId to req, not req.body.
//     // We read it from req.userId here.
//     const { title, type, category, quantity, pickupInstructions } = req.body;

//     const newDonation = new DonationModel({
//         donorId: req.userId, // <-- CORRECTED LINE
//         title,
//         type,
//         category,
//         quantity,
//         pickupInstructions
//     });

//     try {
//         await newDonation.save();
//         res.status(201).json({ success: true, message: "Donation listed successfully." });
//     } catch (error) {
//         console.error("Error adding donation:", error);
//         res.status(500).json({ success: false, message: "An error occurred while listing the donation." });
//     }
// };

// // --- LIST DONATIONS FOR A SPECIFIC DONOR ---
// const listDonorDonations = async (req, res) => {
//     try {
//         // This function already correctly reads from req.userId
//         const donations = await DonationModel.find({ donorId: req.userId });
//         res.json({ success: true, data: donations });
//     } catch (error) {
//         console.error("Error listing donor donations:", error);
//         res.json({ success: false, message: "An error occurred while fetching your donations." });
//     }
// };

// export { addDonation, listDonorDonations };



// import DonationModel from "../models/DonationModel.js";

// // --- ADD A NEW DONATION (from before) ---
// const addDonation = async (req, res) => {
//     const { title, type, category, quantity, pickupInstructions } = req.body;
//     try {
//         const newDonation = new DonationModel({
//             donorId: req.userId, // req.userId is added by the authMiddleware
//             title, type, category, quantity, pickupInstructions
//         });
//         await newDonation.save();
//         res.status(201).json({ success: true, message: "Donation listed successfully." });
//     } catch (error) {
//         console.error("Error adding donation:", error);
//         res.status(500).json({ success: false, message: "An error occurred while listing the donation." });
//     }
// };

// // --- LIST DONATIONS FOR A SPECIFIC DONOR (from before) ---
// const listDonorDonations = async (req, res) => {
//     try {
//         const donations = await DonationModel.find({ donorId: req.userId });
//         res.json({ success: true, data: donations });
//     } catch (error) {
//         console.error("Error listing donor donations:", error);
//         res.json({ success: false, message: "An error occurred while fetching your donations." });
//     }
// };

// // --- NEW: REMOVE A DONATION ---
// const removeDonation = async (req, res) => {
//     try {
//         // Find the donation by its ID to ensure it exists
//         const donation = await DonationModel.findById(req.body.id);
//         if (!donation) {
//             return res.status(404).json({ success: false, message: "Donation not found." });
//         }
        
//         // Security Check: Ensure the user trying to delete the item is the one who created it.
//         if (donation.donorId.toString() !== req.userId) {
//             return res.status(403).json({ success: false, message: "Unauthorized: You can only delete your own donations." });
//         }

//         // If checks pass, remove the donation
//         await DonationModel.findByIdAndDelete(req.body.id);
//         res.json({ success: true, message: "Donation removed successfully." });

//     } catch (error) {
//         console.error("Error removing donation:", error);
//         res.status(500).json({ success: false, message: "An error occurred while removing the donation." });
//     }
// };

// export { addDonation, listDonorDonations, removeDonation };



// import DonationModel from "../models/DonationModel.js";

// --- ADD A NEW DONATION (from your file) ---
// const addDonation = async (req, res) => {
//     const { title, type, category, quantity, pickupInstructions } = req.body;
//     try {
//         const newDonation = new DonationModel({
//             donorId: req.userId, // req.userId is added by the authMiddleware
//             title, type, category, quantity, pickupInstructions
//         });
//         await newDonation.save();
//         res.status(201).json({ success: true, message: "Donation listed successfully." });
//     } catch (error) {
//         console.error("Error adding donation:", error);
//         res.status(500).json({ success: false, message: "An error occurred while listing the donation." });
//     }
// };





// const addDonation = async (req, res) => {
//     // Multer makes the file available in req.file and text fields in req.body
//     if (!req.file) {
//         return res.status(400).json({ success: false, message: "Image file is required." });
//     }

//     // Construct the URL for the saved image
//     const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    
//     // Uncooked items send quantity as a string, Cooked as an object.
//     // We need to parse it if it's an object.
//     let quantity;
//     try {
//         quantity = JSON.parse(req.body.quantity);
//     } catch (e) {
//         quantity = req.body.quantity;
//     }

//     const newDonation = new DonationModel({
//         donorId: req.userId,
//         title: req.body.title,
//         type: req.body.type,
//         category: req.body.category,
//         pickupInstructions: req.body.pickupInstructions,
//         quantity: quantity,
//         imageUrl: imageUrl, // <-- Save the generated image URL
//     });

//     try {
//         await newDonation.save();
//         res.status(201).json({ success: true, message: "Donation listed successfully." });
//     } catch (error) {
//         console.error("Error adding donation:", error);
//         res.status(500).json({ success: false, message: "An error occurred while listing the donation." });
//     }
// };


// // --- LIST DONATIONS FOR A SPECIFIC DONOR (from your file) ---
// const listDonorDonations = async (req, res) => {
//     try {
//         const donations = await DonationModel.find({ donorId: req.userId });
//         res.json({ success: true, data: donations });
//     } catch (error) {
//         console.error("Error listing donor donations:", error);
//         res.json({ success: false, message: "An error occurred while fetching your donations." });
//     }
// };

// // --- REMOVE A DONATION (from your file) ---
// const removeDonation = async (req, res) => {
//     try {
//         // Find the donation by its ID to ensure it exists
//         const donation = await DonationModel.findById(req.body.id);
//         if (!donation) {
//             return res.status(404).json({ success: false, message: "Donation not found." });
//         }
        
//         // Security Check: Ensure the user trying to delete the item is the one who created it.
//         if (donation.donorId.toString() !== req.userId) {
//             return res.status(403).json({ success: false, message: "Unauthorized: You can only delete your own donations." });
//         }

//         // If checks pass, remove the donation
//         await DonationModel.findByIdAndDelete(req.body.id);
//         res.json({ success: true, message: "Donation removed successfully." });

//     } catch (error) {
//         console.error("Error removing donation:", error);
//         res.status(500).json({ success: false, message: "An error occurred while removing the donation." });
//     }
// };

// // --- NEW: UPDATE DONATION QUANTITY ---
// const updateDonationQuantity = async (req, res) => {
//     const { donationId, newQuantity } = req.body;
//     const userId = req.userId; // From authMiddleware

//     try {
//         const donation = await DonationModel.findById(donationId);

//         if (!donation) {
//             return res.status(404).json({ success: false, message: "Donation not found." });
//         }

//         // Security Check: Ensure the user owns this donation
//         if (donation.donorId.toString() !== userId) {
//             return res.status(403).json({ success: false, message: "Unauthorized: You can only update your own donations." });
//         }

//         // Check if the item is of type 'Cooked'
//         if (donation.type !== 'Cooked') {
//             return res.status(400).json({ success: false, message: "Quantity can only be updated for 'Cooked' meal types." });
//         }

//         // Update the quantity and save
//         donation.quantity = newQuantity;
//         await donation.save();

//         res.json({ success: true, message: "Quantity updated successfully." });

//     } catch (error) {
//         console.error("Error updating donation quantity:", error);
//         res.status(500).json({ success: false, message: "An error occurred while updating the quantity." });
//     }
// };

// // --- UPDATED EXPORTS ---
// export { addDonation, listDonorDonations, removeDonation, updateDonationQuantity };




// import DonationModel from "../models/DonationModel.js";

// // --- ADD A NEW DONATION (with improved error handling) ---
// const addDonation = async (req, res) => {
//     // The donor's ID is added to req.userId by the authMiddleware
//     const { title, type, category, quantity, pickupInstructions } = req.body;

//     const newDonation = new DonationModel({
//         donorId: req.userId,
//         title,
//         type,
//         category,
//         quantity,
//         pickupInstructions
//     });

//     try {
//         await newDonation.save();
//         res.status(201).json({ success: true, message: "Donation listed successfully." });
//     } catch (error) {
//         console.error("Error adding donation:", error.message);
        
//         // NEW: Improved Error Handling
//         // Check if the error is a Mongoose validation error
//         if (error.name === 'ValidationError') {
//             // Collect all the specific validation error messages
//             const messages = Object.values(error.errors).map(val => val.message);
//             // Send a 400 Bad Request status with the specific error messages
//             return res.status(400).json({ success: false, message: messages.join(', ') });
//         }

//         // For any other kind of server error, send a generic 500 status
//         res.status(500).json({ success: false, message: "An error occurred on the server." });
//     }
// };

// // --- Other functions (unchanged) ---

// const listDonorDonations = async (req, res) => {
//     try {
//         const donations = await DonationModel.find({ donorId: req.userId });
//         res.json({ success: true, data: donations });
//     } catch (error) {
//         console.error("Error listing donor donations:", error);
//         res.json({ success: false, message: "An error occurred while fetching your donations." });
//     }
// };

// const removeDonation = async (req, res) => {
//     try {
//         const donation = await DonationModel.findById(req.body.id);
//         if (!donation) {
//             return res.status(404).json({ success: false, message: "Donation not found." });
//         }
//         if (donation.donorId.toString() !== req.userId) {
//             return res.status(403).json({ success: false, message: "Unauthorized." });
//         }
//         await DonationModel.findByIdAndDelete(req.body.id);
//         res.json({ success: true, message: "Donation removed." });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Error removing donation." });
//     }
// };

// const updateDonationQuantity = async (req, res) => {
//     try {
//         const { donationId, newQuantity } = req.body;
//         const donation = await DonationModel.findById(donationId);
//         if (!donation) {
//             return res.status(404).json({ success: false, message: "Donation not found." });
//         }
//         if (donation.donorId.toString() !== req.userId) {
//             return res.status(403).json({ success: false, message: "Unauthorized." });
//         }
//         if (donation.type !== 'Cooked') {
//             return res.status(400).json({ success: false, message: "Quantity only updatable for 'Cooked' items." });
//         }
//         donation.quantity.value = newQuantity.value;
//         await donation.save();
//         res.json({ success: true, message: "Quantity updated." });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Error updating quantity." });
//     }
// };


// export { addDonation, listDonorDonations, removeDonation, updateDonationQuantity };






// import DonationModel from "../models/DonationModel.js";
// import TaskModel from "../models/TaskModel.js"; // --- NEW: Import TaskModel ---

// // Your existing addDonation, listDonorDonations, removeDonation, and updateDonationQuantity functions remain here...


// const listClaimedDonations = async (req, res) => {
//     try {
//         // Find all donations where claimedByReceiverId matches the logged-in user's ID
//         const donations = await DonationModel.find({ claimedByReceiverId: req.userId }).populate('donorId', 'fullName roleDetails.organizationName');
//         res.json({ success: true, data: donations });
//     } catch (error) {
//         console.error("Error listing claimed donations:", error);
//         res.json({ success: false, message: "An error occurred while fetching your claimed items." });
//     }
// };




// const addDonation = async (req, res) => {
//     // This code remains unchanged from your provided file
//     const { title, type, category, quantity, pickupInstructions } = req.body;
//     const newDonation = new DonationModel({
//         donorId: req.userId,
//         title, type, category, quantity,
//         imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
//         pickupInstructions
//     });
//     try {
//         await newDonation.save();
//         res.status(201).json({ success: true, message: "Donation listed successfully." });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "An error occurred while listing the donation." });
//     }
// };

// const listDonorDonations = async (req, res) => {
//     // This code remains unchanged from your provided file
//     try {
//         const donations = await DonationModel.find({ donorId: req.userId });
//         res.json({ success: true, data: donations });
//     } catch (error) {
//         res.json({ success: false, message: "An error occurred while fetching your donations." });
//     }
// };

// const removeDonation = async (req, res) => {
//     // This code remains unchanged from your provided file
//     try {
//         const donation = await DonationModel.findById(req.body.id);
//         if (donation.donorId.toString() !== req.userId) {
//             return res.status(403).json({ success: false, message: "Unauthorized." });
//         }
//         await DonationModel.findByIdAndDelete(req.body.id);
//         res.json({ success: true, message: "Donation removed." });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Error removing donation." });
//     }
// };

// const updateDonationQuantity = async (req, res) => {
//     // This code remains unchanged from your provided file
//     try {
//         const { donationId, newQuantity } = req.body;
//         const donation = await DonationModel.findById(donationId);
//         if (donation.donorId.toString() !== req.userId) {
//             return res.status(403).json({ success: false, message: "Unauthorized." });
//         }
//         if (donation.type !== 'Cooked') {
//             return res.status(400).json({ success: false, message: "Quantity only updatable for 'Cooked' items." });
//         }
//         donation.quantity = newQuantity;
//         await donation.save();
//         res.json({ success: true, message: "Quantity updated." });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Error updating quantity." });
//     }
// };


// // --- NEW: LIST ALL AVAILABLE DONATIONS FOR RECEIVERS ---
// const listAvailableDonations = async (req, res) => {
//     try {
//         const donations = await DonationModel.find({ status: 'Available' }).populate('donorId', 'fullName roleDetails.organizationName');
//         res.json({ success: true, data: donations });
//     } catch (error) {
//         console.error("Error listing available donations:", error);
//         res.json({ success: false, message: "An error occurred while fetching donations." });
//     }
// };

// // --- NEW: CLAIM A DONATION ---
// const claimDonation = async (req, res) => {
//     try {
//         const donation = await DonationModel.findById(req.body.donationId);

//         if (!donation) {
//             return res.status(404).json({ success: false, message: "Donation not found." });
//         }
//         if (donation.status !== 'Available') {
//             return res.status(400).json({ success: false, message: "This donation has already been claimed." });
//         }

//         donation.status = 'Claimed';
//         donation.claimedByReceiverId = req.userId;
//         await donation.save();

//         // --- NEW: Automatically create a task for volunteers ---
//         await new TaskModel({
//             donationId: donation._id,
//             urgency: 'Today' // You can add more advanced logic for this later
//         }).save();

//         res.json({ success: true, message: "Donation claimed successfully! A task has been created for volunteers." });

//     } catch (error) {
//         console.error("Error claiming donation:", error);
//         res.status(500).json({ success: false, message: "An error occurred." });
//     }
// };

// // --- NEW: GET DONOR STATISTICS ---
// const getDonorStats = async (req, res) => {
//     try {
//         const donorId = req.userId;
//         const totalDonations = await DonationModel.countDocuments({ donorId });
//         const completedDonations = await DonationModel.countDocuments({ donorId, status: 'Completed' });
//         const claimedDonations = await DonationModel.countDocuments({ donorId, status: 'Claimed' });
//         const availableDonations = await DonationModel.countDocuments({ donorId, status: 'Available' });

//         res.json({
//             success: true,
//             stats: {
//                 total: totalDonations,
//                 completed: completedDonations,
//                 claimed: claimedDonations,
//                 available: availableDonations
//             }
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Error fetching stats." });
//     }
// };

// // --- UPDATED EXPORTS ---
// export { addDonation, listDonorDonations, removeDonation, updateDonationQuantity, listAvailableDonations, claimDonation, getDonorStats ,listClaimedDonations};






// import DonationModel from "../models/DonationModel.js";
// import TaskModel from "../models/TaskModel.js";
// import UserModel from "../models/UserModel.js";

// // --- Donor Functions ---

// const addDonation = async (req, res) => {
//     // This is the corrected version that handles both file and non-file uploads
//     let imageUrl = "";

//     if (req.file) {
//         // If a file was uploaded (from the full donation modal), create the URL
//         imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
//     } else {
//         // If no file was uploaded (from the quick add form), use the imageUrl from the request body
//         imageUrl = req.body.imageUrl;
//     }

//     let quantity;
//     try {
//         quantity = JSON.parse(req.body.quantity);
//     } catch (e) {
//         quantity = req.body.quantity;
//     }

//     const newDonation = new DonationModel({
//         donorId: req.userId,
//         title: req.body.title,
//         type: req.body.type,
//         category: req.body.category,
//         pickupInstructions: req.body.pickupInstructions,
//         quantity: quantity,
//         imageUrl: imageUrl,
//     });

//     try {
//         await newDonation.save();
//         res.status(201).json({ success: true, message: "Donation listed successfully." });
//     } catch (error) {
//         console.error("Error adding donation:", error);
//         res.status(500).json({ success: false, message: "An error occurred while listing the donation." });
//     }
// };

// const listDonorDonations = async (req, res) => {
//     try {
//         const donations = await DonationModel.find({ donorId: req.userId });
//         res.json({ success: true, data: donations });
//     } catch (error) {
//         console.error("Error listing donor donations:", error);
//         res.json({ success: false, message: "An error occurred while fetching your donations." });
//     }
// };

// const removeDonation = async (req, res) => {
//     try {
//         const donation = await DonationModel.findById(req.body.id);
//         if (donation.donorId.toString() !== req.userId) {
//             return res.status(403).json({ success: false, message: "Unauthorized." });
//         }
//         await DonationModel.findByIdAndDelete(req.body.id);
//         res.json({ success: true, message: "Donation removed." });
//     } catch (error) {
//         console.error("Error removing donation:", error);
//         res.status(500).json({ success: false, message: "Error removing donation." });
//     }
// };

// const updateDonationQuantity = async (req, res) => {
//     try {
//         const { donationId, newQuantity } = req.body;
//         const donation = await DonationModel.findById(donationId);
//         if (donation.donorId.toString() !== req.userId) {
//             return res.status(403).json({ success: false, message: "Unauthorized." });
//         }
//         if (donation.type !== 'Cooked') {
//             return res.status(400).json({ success: false, message: "Quantity only updatable for 'Cooked' items." });
//         }
//         donation.quantity = newQuantity;
//         await donation.save();
//         res.json({ success: true, message: "Quantity updated." });
//     } catch (error) {
//         console.error("Error updating quantity:", error);
//         res.status(500).json({ success: false, message: "Error updating quantity." });
//     }
// };

// const getDonorStats = async (req, res) => {
//     try {
//         const donorId = req.userId;
//         const totalDonations = await DonationModel.countDocuments({ donorId });
//         const completedDonations = await DonationModel.countDocuments({ donorId, status: 'Completed' });
//         const claimedDonations = await DonationModel.countDocuments({ donorId, status: 'Claimed' });
//         const availableDonations = await DonationModel.countDocuments({ donorId, status: 'Available' });

//         res.json({
//             success: true,
//             stats: {
//                 total: totalDonations,
//                 completed: completedDonations,
//                 claimed: claimedDonations,
//                 available: availableDonations
//             }
//         });
//     } catch (error) {
//         console.error("Error fetching stats:", error);
//         res.status(500).json({ success: false, message: "Error fetching stats." });
//     }
// };


// // --- Receiver Functions ---

// const listAvailableDonations = async (req, res) => {
//     try {
//         const donations = await DonationModel.find({ status: 'Available' }).populate('donorId', 'fullName roleDetails.organizationName');
//         res.json({ success: true, data: donations });
//     } catch (error) {
//         console.error("Error listing available donations:", error);
//         res.json({ success: false, message: "An error occurred while fetching donations." });
//     }
// };

// const claimDonation = async (req, res) => {
//     try {
//         const donation = await DonationModel.findById(req.body.donationId);

//         if (!donation) {
//             return res.status(404).json({ success: false, message: "Donation not found." });
//         }
//         if (donation.status !== 'Available') {
//             return res.status(400).json({ success: false, message: "This donation has already been claimed." });
//         }

//         donation.status = 'Claimed';
//         donation.claimedByReceiverId = req.userId;
//         await donation.save();

//         await new TaskModel({
//             donationId: donation._id,
//             urgency: 'Today'
//         }).save();

//         res.json({ success: true, message: "Donation claimed successfully! A task has been created for volunteers." });

//     } catch (error) {
//         console.error("Error claiming donation:", error);
//         res.status(500).json({ success: false, message: "An error occurred." });
//     }
// };

// const listClaimedDonations = async (req, res) => {
//     try {
//         const donations = await DonationModel.find({ claimedByReceiverId: req.userId }).populate('donorId', 'fullName roleDetails.organizationName');
//         res.json({ success: true, data: donations });
//     } catch (error) {
//         console.error("Error listing claimed donations:", error);
//         res.json({ success: false, message: "An error occurred while fetching your claimed items." });
//     }
// };


// export {
//     addDonation,
//     listDonorDonations,
//     removeDonation,
//     updateDonationQuantity,
//     getDonorStats,
//     listAvailableDonations,
//     claimDonation,
//     listClaimedDonations
// };






import DonationModel from "../models/DonationModel.js";
import TaskModel from "../models/TaskModel.js";
import { sendDonationClaimedEmail } from '../services/emailService.js';
import UserModel from "../models/UserModel.js";

// --- Donor Functions ---

const addDonation = async (req, res) => {
    // This is the corrected version that handles both file and non-file uploads
    let imageUrl = "";

    if (req.file) {
        // If a file was uploaded (from the full donation modal), create the URL
        imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    } else {
        // If no file was uploaded (from the quick add form), use the imageUrl from the request body
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

// const listDonorDonations = async (req, res) => {
//     try {
//         const donations = await DonationModel.find({ donorId: req.userId });
//         res.json({ success: true, data: donations });
//     } catch (error) {
//         console.error("Error listing donor donations:", error);
//         res.json({ success: false, message: "An error occurred while fetching your donations." });
//     }
// };



const listDonorDonations = async (req, res) => {
    try {
        const donations = await DonationModel.find({ donorId: req.userId })
            .populate('claimedByReceiverId', 'fullName roleDetails.organizationName'); // <-- ADD THIS LINE

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


// --- Receiver Functions ---

// const listAvailableDonations = async (req, res) => {
//     try {
//         const donations = await DonationModel.find({ status: 'Available' }).populate('donorId', 'fullName roleDetails.organizationName');
//         res.json({ success: true, data: donations });
//     } catch (error) {
//         console.error("Error listing available donations:", error);
//         res.json({ success: false, message: "An error occurred while fetching donations." });
//     }
// };


// In donationController.js

const listAvailableDonations = async (req, res) => {
    try {
        // --- UPDATED: Also populate the 'address' field ---
        const donations = await DonationModel.find({ status: 'Available' })
            .populate('donorId', 'fullName roleDetails.organizationName address');
        res.json({ success: true, data: donations });
    } catch (error) {
        console.error("Error listing available donations:", error);
        res.json({ success: false, message: "An error occurred while fetching donations." });
    }
};

// ... rest of the file

const claimDonation = async (req, res) => {
    try {
        const donation = await DonationModel.findById(req.body.donationId);

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

// const listClaimedDonations = async (req, res) => {
//     try {
//         const donations = await DonationModel.find({ claimedByReceiverId: req.userId }).populate('donorId', 'fullName roleDetails.organizationName');
//         res.json({ success: true, data: donations });
//     } catch (error) {
//         console.error("Error listing claimed donations:", error);
//         res.json({ success: false, message: "An error occurred while fetching your claimed items." });
//     }
// };



const listClaimedDonations = async (req, res) => {
    try {
        // Base query always filters by the logged-in receiver
        const query = { claimedByReceiverId: req.userId };

        // If a status is provided in the URL (e.g., /claimed?status=Claimed), add it to the query
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




// --- NEW: GET RECEIVER ACTIVITY SUMMARY ---
const getReceiverStats = async (req, res) => {
    try {
        const receiverId = req.userId; // from authMiddleware

        // Count all donations claimed by this receiver
        const totalClaimed = await DonationModel.countDocuments({ claimedByReceiverId: receiverId });

        // Count claimed donations that are still awaiting pickup (status is 'Claimed')
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


// --- UPDATED EXPORTS ---
export {
    addDonation,
    listDonorDonations,
    removeDonation,
    updateDonationQuantity,
    getDonorStats,
    listAvailableDonations,
    claimDonation,
    listClaimedDonations,
    getReceiverStats // <-- Added new function
};