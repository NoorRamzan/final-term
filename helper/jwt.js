const jwt = require('jsonwebtoken');

// Function to generate JWT token
const generateToken = (payload) => {
    const secretKey = process.env.JWT_SECRET_KEY || 'fallback_secret_key'; // Fallback for development
    if (!secretKey) {
        throw new Error('JWT_SECRET_KEY is not defined in the environment variables');
    }

    const options = {
        expiresIn: '1h', // Set expiration to 1 hour
    };

    try {
        const token = jwt.sign(payload, secretKey, options);
        console.log("Generated Token:", token); // Debug only, remove in production
        return token;
    } catch (error) {
        console.error("Error generating token:", error.message);
        throw error;
    }
};

// Middleware to validate JWT token
const validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.error("Missing or malformed authorization header");
        return res.status(401).json({
            success: false,
            message: 'Authorization token not provided or malformed',
        });
    }

    const token = authHeader.split(' ')[1];
    console.log("Received Token:", token); // Debug only

    const secretKey = process.env.JWT_SECRET_KEY || 'fallback_secret_key';
    if (!secretKey) {
        console.error("JWT_SECRET_KEY is not defined in the environment variables");
        return res.status(500).json({
            success: false,
            message: 'Server configuration error',
        });
    }

    jwt.verify(token, secretKey, (err, payload) => {
        if (err) {
            console.error("Error verifying token:", err.message);
            return res.status(403).json({
                success: false,
                message: err.name === 'TokenExpiredError' ? 'Token has expired' : 'Invalid token',
            });
        }

        req.user = payload; // Attach decoded user info to the request
        console.log("Decoded Payload:", payload); // Debug only
        next(); // Continue to the next middleware or route handler
    });
};

module.exports = {
    generateToken,
    validateToken,
};
