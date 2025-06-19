import TaskModel from "../models/TaskModel.js";
import DonationModel from "../models/DonationModel.js";
import UserModel from "../models/UserModel.js";

import { sendDonationCompletedEmail } from '../services/emailService.js';
// --- LIST ALL OPEN TASKS FOR VOLUNTEERS ---
// export const listOpenTasks = async (req, res) => {
//     try {
//         // Find tasks that are 'Open' and populate all necessary details for the frontend card
//         const tasks = await TaskModel.find({ status: 'Open' })
//             .populate({
//                 path: 'donationId',
//                 model: DonationModel,
//                 select: 'title type quantity',
//                 populate: [
//                     { path: 'donorId', model: UserModel, select: 'fullName address roleDetails.organizationName' },
//                     { path: 'claimedByReceiverId', model: UserModel, select: 'fullName address roleDetails.organizationName' }
//                 ]
//             });
            
//         res.json({ success: true, data: tasks });
//     } catch (error) {
//         console.error("Error listing open tasks:", error);
//         res.status(500).json({ success: false, message: "An error occurred while fetching tasks." });
//     }
// };




// In server/controllers/taskController.js

// ... (keep the existing listOpenTasks and assignTaskToVolunteer functions)

// --- NEW: GET VOLUNTEER STATISTICS ---
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

// --- NEW: LIST TASKS FOR A SPECIFIC VOLUNTEER ---
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

// Make sure to add the new functions to your export list if you're not exporting them individually

export const listOpenTasks = async (req, res) => {
    try {
        const tasks = await TaskModel.find({ status: 'Open' })
            .populate({
                path: 'donationId',
                model: DonationModel,
                // --- THIS IS THE FIX: The restrictive 'select' statement below has been removed ---
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

// --- ASSIGN A TASK TO THE LOGGED-IN VOLUNTEER ---
export const assignTaskToVolunteer = async (req, res) => {
    try {
        const { taskId } = req.body;
        const volunteerId = req.userId; // from authMiddleware

        const task = await TaskModel.findById(taskId);
        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found." });
        }
        if (task.status !== 'Open') {
            return res.status(400).json({ success: false, message: "Task is no longer available." });
        }

        // Assign the task to the volunteer
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

        const task = await TaskModel.findById(taskId);
        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found." });
        }

        // Security check: ensure the person completing the task is the one assigned to it
        if (task.volunteerId.toString() !== volunteerId) {
            return res.status(403).json({ success: false, message: "You are not authorized to complete this task." });
        }

        // Update the task and the original donation
        task.status = 'Completed';
        await task.save();

        await DonationModel.findByIdAndUpdate(task.donationId, { status: 'Completed' });
          const donor = task.donationId.donorId;
        const receiver = task.donationId.claimedByReceiverId;
        await sendDonationCompletedEmail(donor, receiver, volunteer, task.donationId);


        res.json({ success: true, message: "Task marked as complete! Thank you for your help." });

    } catch (error) {
        console.error("Error completing task:", error);
        res.status(500).json({ success: false, message: "An error occurred." });
    }
};
