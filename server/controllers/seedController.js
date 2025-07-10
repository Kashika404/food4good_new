import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const createAdminAccount = async (req, res) => {
    try {
        
        const adminExists = await UserModel.findOne({ primaryRole: 'Admin' });
        if (adminExists) {
            return res.status(409).json({ success: false, message: "An admin account already exists." });
        }

      
        const adminEmail = "kashika.chd@gmail.com";
        const adminPassword = "12345678";

       
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);

        
        const newAdmin = new UserModel({
            fullName: "Site Administrator",
            email: adminEmail,
            password: hashedPassword,
            primaryRole: 'Admin',
            address: {
                street: "123 Admin St",
                city: "System City",
                state: "Control State",
                pincode: "000000",
            },
            identity: {
                idType: "System",
                idNumber: `SYSTEM_ADMIN_${Date.now()}`,
                documentUrl: "N/A"
            },
            isEmailVerified: true, 
            verificationStatus: 'Verified', 
            hasBeenWelcomed: true
        });

        await newAdmin.save();

        res.status(201).json({ success: true, message: `Admin account successfully created for ${adminEmail}. Please remove the seed route now.` });

    } catch (error) {
        console.error("Error creating admin account:", error);
        res.status(500).json({ success: false, message: "Failed to create admin account." });
    }
};