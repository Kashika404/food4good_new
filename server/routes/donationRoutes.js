


// import express from 'express';
// // --- UPDATED IMPORT ---
// import { addDonation, listDonorDonations, removeDonation, updateDonationQuantity } from '../controllers/donationController.js';
// import authMiddleware from '../middleware/auth.js';

// const donationRouter = express.Router();

// // Existing routes (from your file)
// donationRouter.post("/add", authMiddleware, addDonation);
// donationRouter.get("/list", authMiddleware, listDonorDonations);
// donationRouter.post("/remove", authMiddleware, removeDonation);

// // --- NEW ROUTE ADDED ---
// donationRouter.post("/update-quantity", authMiddleware, updateDonationQuantity);

// export default donationRouter;


// import express from 'express';
// import { addDonation, listDonorDonations, removeDonation, updateDonationQuantity } from '../controllers/donationController.js';
// import authMiddleware from '../middleware/auth.js';
// import multer from 'multer'; // <-- Import multer

// // --- MULTER STORAGE CONFIGURATION ---
// const storage = multer.diskStorage({
//     destination: "uploads",
//     filename: (req, file, cb) => {
//         // Create a unique filename to prevent overwriting
//         return cb(null, `${Date.now()}_${file.originalname}`);
//     }
// });

// const upload = multer({ storage: storage });

// const donationRouter = express.Router();

// // --- UPDATE THE "/add" ROUTE ---
// // The upload.single("image") middleware will process the file first.
// // "image" must match the field name on the frontend form.
// donationRouter.post("/add", authMiddleware, upload.single("image"), addDonation);


// donationRouter.get("/list", authMiddleware, listDonorDonations);
// donationRouter.post("/remove", authMiddleware, removeDonation);
// donationRouter.post("/update-quantity", authMiddleware, updateDonationQuantity);

// export default donationRouter;






import express from 'express';
import { addDonation, listDonorDonations, removeDonation, updateDonationQuantity, listAvailableDonations, claimDonation, getDonorStats ,listClaimedDonations,getReceiverStats} from '../controllers/donationController.js';
import authMiddleware from '../middleware/auth.js';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

const donationRouter = express.Router();

// Existing Routes
donationRouter.post("/add", authMiddleware, upload.single("image"), addDonation);
donationRouter.get("/list", authMiddleware, listDonorDonations);
donationRouter.post("/remove", authMiddleware, removeDonation);
donationRouter.post("/update-quantity", authMiddleware, updateDonationQuantity);

// --- NEW ROUTES ---
donationRouter.get("/available", authMiddleware, listAvailableDonations);
donationRouter.post("/claim", authMiddleware, claimDonation);
donationRouter.get("/stats", authMiddleware, getDonorStats);

donationRouter.get("/claimed", authMiddleware, listClaimedDonations);
donationRouter.get("/receiver-stats", authMiddleware, getReceiverStats);

export default donationRouter;