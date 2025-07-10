import TaskModel from "../models/TaskModel.js";
import DonationModel from "../models/DonationModel.js";
import UserModel from "../models/UserModel.js";

import { sendDonationCompletedEmail } from '../services/emailService.js';

export const getVolunteerStats = async (req, res) => {
    try {
        const volunteerId = req.userId;

        const tasksInProgress = await TaskModel.countDocuments({ volunteerId, status: 'Assigned' });
        const tasksCompleted = await TaskModel.countDocuments({ volunteerId, status: 'Completed' });

        res.json({
            success: true,
            stats: {
                inProgress: tasksInProgress,
                completed: tasksCompleted
            }
        });
    } catch (error) {
        console.error("Error fetching volunteer stats:", error);
        res.status(500).json({ success: false, message: "Error fetching activity summary." });
    }
};


export const listVolunteerTasks = async (req, res) => {
    try {
        const query = { volunteerId: req.userId };

        if (req.query.status) {
            query.status = req.query.status;
        }

        const tasks = await TaskModel.find(query)
            .populate({
                path: 'donationId',
                model: DonationModel,
                populate: [
                    { path: 'donorId', model: UserModel, select: 'fullName roleDetails.organizationName' },
                    { path: 'claimedByReceiverId', model: UserModel, select: 'fullName roleDetails.organizationName' }
                ]
            });
        
        res.json({ success: true, data: tasks });

    } catch (error) {
        console.error("Error listing volunteer tasks:", error);
        res.status(500).json({ success: false, message: "An error occurred." });
    }
};



export const listOpenTasks = async (req, res) => {
    try {
        const tasks = await TaskModel.find({ status: 'Open' })
            .populate({
                path: 'donationId',
                model: DonationModel,
                
                populate: [
                    { path: 'donorId', model: UserModel, select: 'fullName address roleDetails.organizationName' },
                    { path: 'claimedByReceiverId', model: UserModel, select: 'fullName address roleDetails.organizationName' }
                ]
            });
            
        res.json({ success: true, data: tasks });
    } catch (error) {
        console.error("Error listing open tasks:", error);
        res.status(500).json({ success: false, message: "An error occurred while fetching tasks." });
    }
};

export const assignTaskToVolunteer = async (req, res) => {
    try {
        const { taskId } = req.body;
        const volunteerId = req.userId; 

        const task = await TaskModel.findById(taskId);
        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found." });
        }
        if (task.status !== 'Open') {
            return res.status(400).json({ success: false, message: "Task is no longer available." });
        }

       
        task.status = 'Assigned';
        task.volunteerId = volunteerId;
        await task.save();

        res.json({ success: true, message: "Task assigned to you successfully!" });

    } catch (error) {
        console.error("Error assigning task:", error);
        res.status(500).json({ success: false, message: "An error occurred." });
    }
};




export const completeTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const volunteerId = req.userId;

        
        const volunteer = await UserModel.findById(volunteerId);
        if (!volunteer) {
            return res.status(404).json({ success: false, message: "Volunteer user not found." });
        }

       
        const task = await TaskModel.findById(taskId).populate({
            path: 'donationId',
            model: DonationModel,
            populate: [
                { path: 'donorId', model: UserModel },
                { path: 'claimedByReceiverId', model: UserModel }
            ]
        });

        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found." });
        }

        if (task.volunteerId.toString() !== volunteerId) {
            return res.status(403).json({ success: false, message: "You are not authorized to complete this task." });
        }
        
       
        if (task.status === 'Completed') {
            return res.status(400).json({ success: false, message: "This task has already been completed." });
        }

        task.status = 'Completed';
        await task.save();

        await DonationModel.findByIdAndUpdate(task.donationId._id, { status: 'Completed' });

       
        const donor = task.donationId.donorId;
        const receiver = task.donationId.claimedByReceiverId;

       
        await sendDonationCompletedEmail(donor, receiver, volunteer, task.donationId);

        res.json({ success: true, message: "Task marked as complete! Thank you for your help." });

    } catch (error) {
        console.error("Error completing task:", error);
        res.status(500).json({ success: false, message: "An error occurred." });
    }
};


export const deleteOrphanedTasks = async (req, res) => {
    try {
        // Find all tasks and populate the donationId to check its validity
        const allTasks = await TaskModel.find({}).populate('donationId');

        const orphanedTaskIds = allTasks
            .filter(task => !task.donationId) // Filter tasks where the donation doesn't exist at all
            .map(task => task._id);

        if (orphanedTaskIds.length > 0) {
            await TaskModel.deleteMany({ _id: { $in: orphanedTaskIds } });
        }

        res.json({
            success: true,
            message: `Cleanup successful. Removed ${orphanedTaskIds.length} orphaned task(s).`
        });

    } catch (error) {
        console.error("Error cleaning up orphaned tasks:", error);
        res.status(500).json({ success: false, message: "An error occurred during cleanup." });
    }
};