// import express from 'express';
// import { registerUser, loginUser } from '../controllers/userController.js';

// const userRouter = express.Router();

// // Route for user registration
// userRouter.post("/register", registerUser);

// // Route for user login
// userRouter.post("/login", loginUser);

// export default userRouter;



// import express from 'express';
// // --- UPDATED IMPORT ---
// import { registerUser, loginUser, getUserProfile } from '../controllers/userController.js';
// import authMiddleware from '../middleware/auth.js';

// const userRouter = express.Router();

// userRouter.post("/register", registerUser);
// userRouter.post("/login", loginUser);

// // --- NEW ROUTE ADDED ---
// // This route is protected, it requires a valid token to access
// userRouter.get("/profile", authMiddleware, getUserProfile);


// export default userRouter;


// import express from 'express';
// import { 
//     registerUser, 
//     loginUser, 
//     getUserProfile, 
//     // changePassword, 
//     updateNotificationPreferences, 
//     deleteAccount 
// } from '../controllers/userController.js';
// import authMiddleware from '../middleware/auth.js';

// const userRouter = express.Router();

// userRouter.post("/register", registerUser);
// userRouter.post("/login", loginUser);

// // --- ROUTES PROTECTED BY AUTH MIDDLEWARE ---
// userRouter.get("/profile", authMiddleware, getUserProfile);
// userRouter.post("/change-password", authMiddleware, changePassword);
// userRouter.post("/update-notifications", authMiddleware, updateNotificationPreferences);
// userRouter.delete("/delete-account", authMiddleware, deleteAccount);
// // userRouter.post("/change-password", authMiddleware, changePassword);


// export default userRouter;




// import express from 'express';
// import { 
//     registerUser, 
//     loginUser, 
//     getUserProfile, 
//     changePassword, // <-- FIX: This line is now uncommented
//     updateNotificationPreferences, 
//     deleteAccount ,
//     forgotPassword, resetPassword
// } from '../controllers/userController.js';
// import authMiddleware from '../middleware/auth.js';
// import multer from 'multer';

// const storage = multer.diskStorage({
//     destination: "uploads", // This will create an 'uploads' folder in your 'server' directory
//     filename: (req, file, cb) => {
//         // Create a unique filename to avoid conflicts: timestamp + original name
//         return cb(null, `${Date.now()}_${file.originalname}`);
//     }
// });
// const upload = multer({ storage: storage });


// const userRouter = express.Router();

// userRouter.post("/register", registerUser);
// userRouter.post("/login", loginUser);

// // --- ROUTES PROTECTED BY AUTH MIDDLEWARE ---
// userRouter.get("/profile", authMiddleware, getUserProfile);
// userRouter.post("/change-password", authMiddleware, changePassword);
// userRouter.post("/update-notifications", authMiddleware, updateNotificationPreferences);
// userRouter.delete("/delete-account", authMiddleware, deleteAccount);

// userRouter.post("/forgot-password", forgotPassword);
// userRouter.post("/reset-password/:id/:token", resetPassword);



// export default userRouter;








// import express from 'express';
// import {
//   registerUser,
//   loginUser,
//   getUserProfile,
//   changePassword,
//   updateNotificationPreferences,
//   deleteAccount,
//   forgotPassword,
//   resetPassword,
//   updateUserProfile
// } from '../controllers/userController.js';
// import authMiddleware from '../middleware/auth.js';
// import multer from 'multer';
// import { body } from 'express-validator';

// import cloudinary from '../config/cloudinary.js';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';

// // Set up Multer storage for uploaded identity documents
// const storage = multer.diskStorage({
//   destination: 'uploads', // saves in /uploads folder
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   }
// });

// // const upload = multer({ storage });

// const upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, true); // Accept the file
//         } else {
//             cb(null, false); // Reject the file
//             return cb(new Error('Only .png, .jpg and .jpeg image formats are allowed!'));
//         }
//     }
// });

// const userRouter = express.Router();

// // ✅ REGISTER route uses multer middleware to parse multipart/form-data
// // userRouter.post('/register', upload.single('identityDocument'), registerUser);


// userRouter.post('/register',
//     upload.single('identityDocument'),
//     [
//       // --- NEW: Validation rules for registration ---
//       body('fullName', 'Full name is required').notEmpty(),
//       body('email', 'Please include a valid email').isEmail(),
//       body('password', 'Password must be at least 8 characters long').isLength({ min: 8 }),
//       body('street', 'Street address is required').notEmpty(),
//       body('city', 'City is required').notEmpty(),
//       body('state', 'State is required').notEmpty(),
//       body('pincode', 'Please enter a valid Indian pincode').isPostalCode('IN'),
//       body('idNumber', 'ID Number is required').notEmpty(),
//       body('idType', 'ID Type is required').notEmpty(),
//       body('primaryRole', 'A user role must be selected').notEmpty()
//     ],
//     registerUser);

// // LOGIN
// userRouter.post('/login', loginUser);

// // PROTECTED ROUTES
// userRouter.get('/profile', authMiddleware, getUserProfile);
// userRouter.post('/change-password', authMiddleware, changePassword);
// userRouter.post('/update-notifications', authMiddleware, updateNotificationPreferences);
// userRouter.delete('/delete-account', authMiddleware, deleteAccount);

// // PASSWORD RESET
// userRouter.post('/forgot-password', forgotPassword);
// userRouter.post('/reset-password/:id/:token', resetPassword);

// userRouter.put('/profile', authMiddleware, updateUserProfile);

// export default userRouter;








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
  updateUserProfile
} from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';
import multer from 'multer';
import { body } from 'express-validator';

import cloudinary from '../config/cloudinary.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Set up Multer storage for uploaded identity documents
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'food4good/identity_documents', // A folder name in your Cloudinary account
    allowed_formats: ['jpg', 'png', 'jpeg'],
    // You can add transformations here if you want to resize images on upload
    // transformation: [{ width: 500, height: 500, crop: 'limit' }]
  },
});

// const upload = multer({ storage });

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true); // Accept the file
        } else {
            cb(null, false); // Reject the file
            return cb(new Error('Only .png, .jpg and .jpeg image formats are allowed!'));
        }
    }
});

const userRouter = express.Router();

// ✅ REGISTER route uses multer middleware to parse multipart/form-data
// userRouter.post('/register', upload.single('identityDocument'), registerUser);


userRouter.post('/register',
    upload.single('identityDocument'),
    [
      // --- NEW: Validation rules for registration ---
      body('fullName', 'Full name is required').notEmpty(),
      body('email', 'Please include a valid email').isEmail(),
      body('password', 'Password must be at least 8 characters long').isLength({ min: 8 }),
      body('street', 'Street address is required').notEmpty(),
      body('city', 'City is required').notEmpty(),
      body('state', 'State is required').notEmpty(),
      body('pincode', 'Please enter a valid Indian pincode').isPostalCode('IN'),
      body('idNumber', 'ID Number is required').notEmpty(),
      body('idType', 'ID Type is required').notEmpty(),
      body('primaryRole', 'A user role must be selected').notEmpty()
    ],
    registerUser);

// LOGIN
userRouter.post('/login', loginUser);

// PROTECTED ROUTES
userRouter.get('/profile', authMiddleware, getUserProfile);
userRouter.post('/change-password', authMiddleware, changePassword);
userRouter.post('/update-notifications', authMiddleware, updateNotificationPreferences);
userRouter.delete('/delete-account', authMiddleware, deleteAccount);

// PASSWORD RESET
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password/:id/:token', resetPassword);

userRouter.put('/profile', authMiddleware, updateUserProfile);

export default userRouter;
