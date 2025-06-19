




import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js'; // Assuming your db file is named mongodb.js
import userRoutes from './routes/userRoutes.js';
import donationRoutes from './routes/donationRoutes.js'; // <-- Import donation routes
import taskRoutes from './routes/taskRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import rateLimit from 'express-rate-limit';
import path from 'path'; // <-- Import path module
import distanceRouter from './routes/distanceRoutes.js';

// Load environment variables
dotenv.config();

// App Config
const app = express();
const port = process.env.PORT || 4000;

const __dirname = path.resolve();
// app.use('/images', express.static(path.join(__dirname, 'uploads')));


// Middleware
// const corsOptions = {
//     origin: 'http://localhost:5173',
//     'https://food4goodmern.vercel.app',
//     optionsSuccessStatus: 200
// };

// const corsOptions = {
//     origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
//     optionsSuccessStatus: 200
// };

// The new, corrected code
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type, Authorization, token",
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());



const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per 15-minute window
	standardHeaders: true,
	legacyHeaders: false,
});
app.use(limiter);


app.use('/images', express.static('uploads'));


app.use('/uploads', express.static('uploads'));





connectDB();

// --- API Endpoints ---
app.use("/api/user", userRoutes);
app.use("/api/donation", donationRoutes); 
app.use("/api/task", taskRoutes); 
app.use("/api/admin", adminRoutes);
app.use("/api/distance", distanceRouter);



app.get("/", (req, res) => {
    res.send("Food4Good API is Running...");
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
