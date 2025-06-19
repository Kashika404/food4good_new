// import jwt from "jsonwebtoken";

// const authMiddleware = async (req, res, next) => {
//     // Check for a token in the request headers
//     const { token } = req.headers;

//     if (!token) {
//         return res.status(401).json({ success: false, message: "Not Authorized. Please login again." });
//     }

//     try {
//         // Verify the token using your secret key
//         const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        
//         // Attach the user's ID from the token to the request body
//         // so the next controller function knows who is making the request.
//         req.body.userId = token_decode.id;

//         // Proceed to the next function in the chain (e.g., the donation controller)
//         next();
//     } catch (error) {
//         console.error("Auth middleware error:", error);
//         res.status(401).json({ success: false, message: "Error in token verification." });
//     }
// };

// export default authMiddleware;


import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized. Please login again." });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        
        // CORRECTED: Attach userId directly to the request object
        req.userId = token_decode.id;

        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        res.status(401).json({ success: false, message: "Error in token verification." });
    }
};

export default authMiddleware;

