import jwt from 'jsonwebtoken';
import { ErrorHandler } from './error.js';

// Middleware to check if user is authenticated
const isAuthenticated = (req, resp, next) => {
    const token = req.cookies["user-token"]; // Get token from cookies

    // If token is missing, return error
    if (!token) {
        return next(new ErrorHandler("plz login using secret code", 203));
    }

    // Verify token and decode data
    const decodedData = jwt.verify(token, "abcdef");

    // Check if the secret code in the token matches the environment value
    if (decodedData.secretCode == process.env.SECRETCODE) {
        next(); // User is authenticated, proceed to next middleware or route
    } else {
        next(new ErrorHandler("plz login properly")); // Token is invalid or secret code does not match
    }
};

export { isAuthenticated };
