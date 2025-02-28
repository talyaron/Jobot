import jwt from "jwt-simple";
import dotenv from "dotenv";
import { NextFunction } from "express";

dotenv.config(); 

const secretKey = process.env.SECRET_JWT as string;

export const authMiddleware = (
  req: any,
  res: any,
  next: NextFunction
) => {
  try {
      const token = req.cookies?.token;
      console.log("Received token:", token);
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    
      const decoded = jwt.decode(token, secretKey);
      console.log("decoded ID", decoded.userId);
    
    if (!decoded.userId) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

      req.body.userId = decoded.userId; // Add userId to the request body
      console.log("Assigned UserID:", req.body.userId);
    next(); // Continue to the next middleware
  } catch (error) {
    console.error("JWT decode error:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
