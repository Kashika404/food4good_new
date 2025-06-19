// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     fullName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     // The primary role of the user
//     primaryRole: { 
//         type: String, 
//         required: true,
//         enum: ['Donor', 'Receiver', 'Volunteer'] // Ensures role is one of these values
//     },
//     // A flexible object to hold role-specific details
//     roleDetails: {
//         // For Donors
//         donorType: { type: String }, // e.g., 'Individual', 'Restaurant'
        
//         // For Receivers
//         organizationName: { type: String },
//         receiverType: { type: String }, // e.g., 'Old Age Home', 'Orphanage'

//         // For Volunteers
//         volunteerRole: { type: String } // e.g., 'Pickup Agent', 'Coordinator'
//     },
//      notificationPreferences: {
//         email: { type: Boolean, default: true },
//         push: { type: Boolean, default: false }
//     }
// }, { minimize: false, timestamps: true }); // minimize: false ensures roleDetails is saved even if empty

// // This logic prevents Mongoose from redefining the model if this file is ever re-evaluated
// const UserModel = mongoose.models.user || mongoose.model("user", userSchema);

// export default UserModel;




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
    // --- NEW FIELD ADDED ---
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
        idType: { type: String, required: true, unique: true  }, // e.g., 'Aadhaar', 'PAN Card'
        idNumber: { type: String, required: true, unique: true },
        documentUrl: { type: String, required: true } // Path to the uploaded ID file
    },
    verificationStatus: {
        type: String,
        enum: ['Pending', 'Verified', 'Rejected'],
        default: 'Pending'
    }
}, { minimize: false, timestamps: true });

const UserModel = mongoose.models.user || mongoose.model("user", userSchema);

export default UserModel;