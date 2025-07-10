
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js'; 
import userRoutes from './routes/userRoutes.js';
import donationRoutes from './routes/donationRoutes.js'; 
import taskRoutes from './routes/taskRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import rateLimit from 'express-rate-limit';
import path from 'path'; 
import distanceRouter from './routes/distanceRoutes.js';
import seedRouter from './routes/seedRoutes.js';


dotenv.config();


const app = express();
const port = process.env.PORT || 4000;

const __dirname = path.resolve();

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
	windowMs: 15 * 60 * 1000, 
	max: 100, 
	standardHeaders: true,
	legacyHeaders: false,
});
app.use(limiter);


app.use('/images', express.static('uploads'));


app.use('/uploads', express.static('uploads'));





connectDB();


app.use("/api/user", userRoutes);
app.use("/api/seed", seedRouter); 
app.use("/api/donation", donationRoutes); 
app.use("/api/task", taskRoutes); 
app.use("/api/admin", adminRoutes);
app.use("/api/distance", distanceRouter);



app.get("/", (req, res) => {
    res.send("Food4Good API is Running...");
});


app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
