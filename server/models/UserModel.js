
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    primaryRole: { 
        type: String, 
        required: true,
        enum: ['Donor', 'Receiver', 'Volunteer','Admin']
    },
    roleDetails: {
        donorType: { type: String },
        organizationName: { type: String },
        receiverType: { type: String },
        volunteerRole: { type: String }
    },
    
    notificationPreferences: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: false }
    },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true },
        country: { type: String, default: 'India' }
    },
    identity: {
        idType: { type: String, required: true }, 
        idNumber: { type: String, required: true, unique: true },
        documentUrl: { type: String, required: true } 
    },
     isEmailVerified: {
        type: Boolean,
        default: false
    },
    emailVerificationToken: {
        type: String,
        select: false 
    },

    verificationStatus: {
        type: String,
        enum: ['Pending', 'Verified', 'Rejected'],
        default: 'Pending'
    },
     hasBeenWelcomed: {
        type: Boolean,
        default: false
    }
}, { minimize: false, timestamps: true });

const UserModel = mongoose.models.user || mongoose.model("user", userSchema);

export default UserModel;