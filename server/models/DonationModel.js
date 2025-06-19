import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ['Cooked', 'Uncooked'], required: true },
    category: { type: String, required: true },
    quantity: { type: mongoose.Schema.Types.Mixed, required: true }, // Allows for both objects {value, unit} and strings
    imageUrl: { type: String, default: '' },
    status: { 
        type: String, 
        enum: ['Available', 'Claimed', 'Completed'], 
        default: 'Available' 
    },
    donorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', // This links to a user document in the 'users' collection
        required: true 
    },
    claimedByReceiverId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' // This will be populated when a receiver claims the item
    },
    pickupInstructions: { type: String, default: '' },
    // You can add location fields here later for more advanced features
}, { timestamps: true });

// This logic prevents Mongoose from redefining the model if this file is ever re-evaluated
const DonationModel = mongoose.models.donation || mongoose.model("donation", donationSchema);

export default DonationModel;
