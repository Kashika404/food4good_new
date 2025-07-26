


import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  changePassword,
  updateNotificationPreferences,
  deleteAccount,
  forgotPassword,
  resetPassword,
  updateUserProfile,
  markUserAsWelcomed,
  verifyUserEmail,
   resendVerificationEmail
} from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';
import multer from 'multer';
import { body } from 'express-validator';

import cloudinary from '../config/cloudinary.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'food4good/identity_documents', 
    allowed_formats: ['jpg', 'png', 'jpeg'],
    
  },
});



const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true); 
        } else {
            cb(null, false); 
            return cb(new Error('Only .png, .jpg and .jpeg image formats are allowed!'));
        }
    }
});

const userRouter = express.Router();



userRouter.post('/register',
    upload.single('identityDocument'),
    [
     
      body('fullName', 'Full name is required').notEmpty(),
      body('email', 'Please include a valid email').isEmail(),
      body('password', 'Password must be at least 8 characters long').isLength({ min: 8 }),
      body('street', 'Street address is required').notEmpty(),
      body('city', 'City is required').notEmpty(),
      body('state', 'State is required').notEmpty(),
      body('pincode', 'Please enter a valid Indian pincode').isPostalCode('IN'),
       body('phone').optional({ checkFalsy: true }).isString(),
      body('idNumber', 'ID Number is required').notEmpty(),
      body('idType', 'ID Type is required').notEmpty(),
      body('primaryRole', 'A user role must be selected').notEmpty()
    ],
    registerUser);


userRouter.get('/test', (req, res) => { 
    res.send("User route test is working!");
});
userRouter.post('/login', loginUser);


userRouter.get('/profile', authMiddleware, getUserProfile);
userRouter.post('/change-password', authMiddleware, changePassword);
userRouter.post('/update-notifications', authMiddleware, updateNotificationPreferences);
userRouter.delete('/delete-account', authMiddleware, deleteAccount);


userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password/:id/:token', resetPassword);

userRouter.put('/profile', authMiddleware, updateUserProfile);
userRouter.post('/mark-welcomed', authMiddleware, markUserAsWelcomed);
userRouter.post('/verify-email', verifyUserEmail);
userRouter.post('/resend-verification', resendVerificationEmail);
export default userRouter;
