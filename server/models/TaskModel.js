import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    donationId: { type: mongoose.Schema.Types.ObjectId, ref: 'donation', required: true },
    taskType: { type: String, enum: ['Pickup & Delivery'], default: 'Pickup & Delivery' },
    status: { type: String, enum: ['Open', 'Assigned', 'Completed'], default: 'Open' },
    volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', default: null },
    // Urgency can be determined by the donation's expiry date
    urgency: { type: String, enum: ['Urgent', 'Today', 'Flexible'], default: 'Today' },
}, { timestamps: true });

const TaskModel = mongoose.models.task || mongoose.model("task", taskSchema);
export default TaskModel;