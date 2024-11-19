import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  // Get token from header
  const authHeader = req.header('Authorization');
  console.log('Auth header:', authHeader);
  
  const token = authHeader?.replace('Bearer ', '');
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
    
    const decoded = jwt.verify(token, jwtSecret) as CustomJwtPayload;
    console.log('Decoded token:', decoded);
    
    (req as any).user = { id: decoded.userId };
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(401).json({ message: 'Token is not valid', error: err instanceof Error ? err.message : String(err) });
  }
};
