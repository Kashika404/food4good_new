
import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import DonationModel from "../models/DonationModel.js"; 
import TaskModel from "../models/TaskModel.js";
import validator from "validator";
import nodemailer from 'nodemailer';
import { validationResult } from "express-validator";
import { sendApprovalEmail, sendRejectionEmail } from '../services/emailService.js';
import crypto from 'crypto';
import { sendVerificationEmail } from '../services/emailService.js'; 




const createTransporter = () => nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});



const sendConfirmationEmail = async (userName, userEmail) => {
    try {
        await createTransporter().sendMail({
            from: `"Food4Good" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: 'Welcome to Food4Good! Your Account is Ready.',
            html: `<h1>Welcome, ${userName}!</h1><p>Thank you for joining Food4Good. Your account is ready.</p>`
        });
    } catch (error) {
        console.error('Error sending confirmation email:', error);
    }
};



const createToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET);
};





const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist." });
        }
        
     
        if (!user.isEmailVerified) {
            return res.status(401).json({ success: false, message: "Please verify your email address before logging in." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials." });
        }
   
        const token = createToken(user._id, user.primaryRole);
        res.json({ success: true, token, role: user.primaryRole });
    } catch (error) {
        console.error("Login Error:", error); 
        res.status(500).json({ success: false, message: "Error during login." });
    }
};



const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { fullName, email, password, primaryRole, roleDetails, street, city, state, pincode, idType, idNumber ,phone} = req.body;

    if (!req.file) {
        return res.status(400).json({ success: false, message: "ID document upload is required." });
    }
   
    const documentUrl = req.file.path; 

    try {
        const emailExists = await UserModel.findOne({ email });
        if (emailExists) {
           
            return res.status(400).json({ success: false, errors: [{ msg: "User with this email already exists." }] });
        }
        
        const idExists = await UserModel.findOne({ 'identity.idNumber': idNumber });
        if (idExists) {
            
            return res.status(400).json({ success: false, errors: [{ msg: "A user with this ID number already exists." }] });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const verificationToken = crypto.randomBytes(32).toString('hex');
       
        const newUser = new UserModel({
            fullName,
            email,
            password: hashedPassword,
             phone, 
            primaryRole,
            emailVerificationToken: verificationToken, 
            isEmailVerified: false, 
            roleDetails: JSON.parse(roleDetails),
            address: { street, city, state, pincode },
            identity: { idType, idNumber, documentUrl: documentUrl }
        });

        const user = await newUser.save();
         console.log(`[Register] Token created for ${user.email}: ${verificationToken}`);

        await sendVerificationEmail(user, verificationToken);
        res.status(201).json({ success: true, message: "Registration successful! Please check your email to verify your account." });

    } catch (error) {
        console.error("Error in user registration:", error);
        res.status(500).json({ success: false, message: "An error occurred during registration." });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId).select('-password');
        if (user) res.json({ success: true, user });
        else res.status(404).json({ success: false, message: "User not found." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching profile." });
    }
};

const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found." });
        
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Incorrect current password." });
        }
        
        if (newPassword.length < 8) {
            return res.status(400).json({ success: false, message: "New password must be at least 8 characters." });
        }
        
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        
       
        await UserModel.findByIdAndUpdate(req.userId, { $set: { password: user.password } });
        
        res.json({ success: true, message: "Password updated successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred." });
    }
};


const updateNotificationPreferences = async (req, res) => {
    try {
        await UserModel.findByIdAndUpdate(req.userId, { notificationPreferences: req.body });
        res.json({ success: true, message: "Preferences updated." });
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred." });
    }
};




const deleteAccount = async (req, res) => {
    try {
        const userId = req.userId;

     
        const userDonations = await DonationModel.find({ donorId: userId });
        if (userDonations.length > 0) {
            const donationIds = userDonations.map(d => d._id);
            await TaskModel.deleteMany({ donationId: { $in: donationIds } });
            await DonationModel.deleteMany({ donorId: userId });
        }

       
        const claimedDonations = await DonationModel.find({ claimedByReceiverId: userId });
        if (claimedDonations.length > 0) {
            const claimedDonationIds = claimedDonations.map(d => d._id);
            
            await TaskModel.deleteMany({ donationId: { $in: claimedDonationIds } });

           
            await DonationModel.updateMany(
                { _id: { $in: claimedDonationIds } },
                { $set: { status: 'Available' }, $unset: { claimedByReceiverId: 1 } }
            );
        }

        
        await TaskModel.updateMany(
            { volunteerId: userId, status: 'Assigned' },
            { $set: { status: 'Open' }, $unset: { volunteerId: 1 } }
        );

      
        await UserModel.findByIdAndDelete(userId);

        res.json({ success: true, message: "Account and all associated data have been successfully deleted." });

    } catch (error) {
        console.error("Error deleting account:", error);
        res.status(500).json({ success: false, message: "An error occurred during account deletion." });
    }
};
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.json({ success: true, message: "If an account with this email exists, a password reset link has been sent." });
        }

        const resetSecret = process.env.JWT_SECRET + user.password;
        const resetToken = jwt.sign({ id: user._id, email: user.email }, resetSecret, { expiresIn: '15m' });
        // const resetLink = `http://localhost:5173/reset-password/${user._id}/${resetToken}`;
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${user._id}/${resetToken}`;

        const transporter = createTransporter();
        await transporter.sendMail({
            from: `"Food4Good" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: "Password Reset Request for Food4Good",
            html: `
                <p>Hello ${user.fullName},</p>
                <p>You requested a password reset. Please click the link below to set a new password. This link is valid for 15 minutes.</p>
                <a href="${resetLink}" style="background-color: #f97316; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
                <p>If you did not request this, please ignore this email.</p>
            `
        });
        
        console.log("Password reset link:", resetLink);
        res.json({ success: true, message: "If an account with this email exists, a password reset link has been sent." });

    } catch (error) {
        console.error("Forgot password error:", error);
        res.json({ success: false, message: "An error occurred." });
    }
};


const resetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        const resetSecret = process.env.JWT_SECRET + user.password;
        
        jwt.verify(token, resetSecret, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ success: false, message: "Invalid or expired password reset token." });
            }

            if (password.length < 8) {
                return res.json({ success: false, message: "Password must be at least 8 characters long." });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
           
            await UserModel.findByIdAndUpdate(id, { $set: { password: hashedPassword } });

            res.json({ success: true, message: "Password has been reset successfully. Please login with your new password." });
        });

    } catch (error) {
        console.error("Reset password error:", error);
        res.json({ success: false, message: "An error occurred." });
    }
};


// const updateUserProfile = async (req, res) => {
//     try {
//         const updates = {
//             fullName: req.body.fullName,
//             address: req.body.address,
//         };
//         const user = await UserModel.findByIdAndUpdate(req.userId, updates, { new: true }).select('-password');
//         res.json({ success: true, message: "Profile updated successfully.", user });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "An error occurred while updating the profile." });
//     }
// };
const updateUserProfile = async (req, res) => {
    try {
        // Get all editable fields from the request body
        const { fullName, address, roleDetails ,phone} = req.body;

        const updates = {
            fullName,
            address,
            roleDetails,
            phone
        };

        const user = await UserModel.findByIdAndUpdate(req.userId, updates, { new: true }).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        res.json({ success: true, message: "Profile updated successfully.", user });
        
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ success: false, message: "An error occurred while updating the profile." });
    }
};




const listPendingUsers = async (req, res) => {
    try {
        const users = await UserModel.find({ verificationStatus: 'Pending' }).select('-password');
        res.json({ success: true, data: users });
    } catch (error) {
        console.error("Error fetching pending users:", error);
        res.status(500).json({ success: false, message: "Server error." });
    }
};

const approveUser = async (req, res) => {
    try {
        const userIdToApprove = req.params.userId;
        const user = await UserModel.findByIdAndUpdate(userIdToApprove, { verificationStatus: 'Verified' }, { new: true });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        await sendApprovalEmail(user);
        res.json({ success: true, message: "User has been approved successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error while approving user." });
    }
};

const rejectUser = async (req, res) => {
    try {
        const userIdToReject = req.params.userId;
        const user = await UserModel.findByIdAndUpdate(userIdToReject, { verificationStatus: 'Rejected' }, { new: true });
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

          await sendRejectionEmail(user);
        res.json({ success: true, message: "User has been rejected." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error while rejecting user." });
    }
};
const markUserAsWelcomed = async (req, res) => {
    try {
        await UserModel.findByIdAndUpdate(req.userId, { hasBeenWelcomed: true });
        res.json({ success: true, message: "User welcomed status updated." });
    } catch (error) {
        console.error("Error marking user as welcomed:", error);
        res.status(500).json({ success: false, message: "An error occurred." });


    }
};


const verifyUserEmail = async (req, res) => {
    try {
        const { token } = req.body; 
         console.log(`[Verify] Verification attempt with token from URL: ${token}`);
        if (!token) {
            return res.status(400).redirect(`${process.env.FRONTEND_URL}/email-verified?success=false`);
        }

        const user = await UserModel.findOne({ emailVerificationToken: token });

        if (!user) {
            
            return res.status(400).redirect(`${process.env.FRONTEND_URL}/email-verified?success=false&message=Invalid or expired token.`);
        }

        user.isEmailVerified = true;
        user.emailVerificationToken = undefined; 
        await user.save();
        
    
        // res.redirect(`${process.env.FRONTEND_URL}/email-verified?success=true`);
         res.json({ success: true, message: "Email verified successfully." })

    } catch (error) {
        console.error("Error verifying email:", error);
        res.status(500).redirect(`${process.env.FRONTEND_URL}/email-verified?success=false&message=Server error.`);
    }
};

const resendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User with this email does not exist." });
        }
        if (user.isEmailVerified) {
            return res.status(400).json({ success: false, message: "This email has already been verified." });
        }

      
        const verificationToken = crypto.randomBytes(32).toString('hex');
        user.emailVerificationToken = verificationToken;
        await user.save();

    
        await sendVerificationEmail(user, verificationToken);
        
        res.json({ success: true, message: "A new verification link has been sent to your email address." });

    } catch (error) {
        console.error("Error resending verification email:", error);
        res.status(500).json({ success: false, message: "An error occurred." });
    }
};

export { registerUser, loginUser, getUserProfile, changePassword, updateNotificationPreferences, deleteAccount,forgotPassword, resetPassword ,updateUserProfile,listPendingUsers,approveUser,rejectUser, markUserAsWelcomed,verifyUserEmail ,resendVerificationEmail} 
