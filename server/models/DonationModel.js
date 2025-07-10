import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ['Cooked', 'Uncooked'], required: true },
    category: { type: String, required: true },
    quantity: { type: mongoose.Schema.Types.Mixed, required: true }, 
    imageUrl: { type: String, default: '' },
    status: { 
        type: String, 
        enum: ['Available', 'Claimed', 'Completed'], 
        default: 'Available' 
    },
    donorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true 
    },
    claimedByReceiverId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' 
    },
    pickupInstructions: { type: String, default: '' },
  
}, { timestamps: true });


const DonationModel = mongoose.models.donation || mongoose.model("donation", donationSchema);

export default DonationModel;
