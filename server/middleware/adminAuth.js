import UserModel from "../models/UserModel.js";

const adminAuth = async (req, res, next) => {
    try {
        // First, find the user based on the ID from the regular authMiddleware
        const user = await UserModel.findById(req.userId);

        // Check if the user exists and if their role is 'Admin'
        if (user && user.primaryRole === 'Admin') {
            next(); // If they are an admin, proceed to the next function
        } else {
            // If not an admin, send a "Forbidden" error
            return res.status(403).json({ success: false, message: "Admin access required. Action forbidden." });
        }
    } catch (error) {
        console.error("Admin auth middleware error:", error);
        res.status(500).json({ success: false, message: "Server error during admin verification." });
    }
};

export default adminAuth;