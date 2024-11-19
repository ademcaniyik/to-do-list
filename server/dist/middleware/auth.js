"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    // Get token from header
    const authHeader = req.header('Authorization');
    console.log('Auth header:', authHeader);
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.replace('Bearer ', '');
    console.log('Extracted token:', token);
    // Check if no token
    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        // Verify token
        const jwtSecret = process.env.JWT_SECRET || 'secret';
        console.log('Using JWT secret:', jwtSecret);
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        console.log('Decoded token:', decoded);
        req.user = { id: decoded.userId };
        next();
    }
    catch (err) {
        console.error('Token verification error:', err);
        res.status(401).json({ message: 'Token is not valid', error: err instanceof Error ? err.message : String(err) });
    }
};
exports.auth = auth;
