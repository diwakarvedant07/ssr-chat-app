const jwt = require("jsonwebtoken");
const UserModel = require("../models/user-model");

// Middleware to verify JWT for logging routes
const verifyJwtForLog = (req, res, next) => {
    // Extract token from headers
    const token = req.headers["x-access-token"];

    // Check if token is not provided
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Verify the token using the secret key
    jwt.verify(token, process.env.JWT_TOKEN_KEY, async(err, decoded) => {

        // Check for invalid token
        if (err) {
            return res.status(400).json({ message: 'Invalid Token' });
        } else {
            const data = await UserModel.findOne({ ip: decoded.ip })
            
            if (data.isBanned) {
                return res.status(400).json({ message: 'Perma-Ban' });
            } else {
                // Continue to the next middleware or route handler
                res.decoded = decoded
                //console.log(res.decoded)
                next();
            }

        }
    });
};

module.exports = verifyJwtForLog;
