import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction } from "express";

dotenv.config();

const secretKey = process.env.SECRET_JWT as string;

export const userIdMiddleware = (req: any, res: any, next: NextFunction) => {
  try {


    const userEncoded = req.cookies.user;

    if (!userEncoded) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const decoded = jwt.verify(userEncoded, secretKey) as { userId: string };

    if (!decoded.userId) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.userId = decoded.userId; // Add userId to the request body

    next(); // Continue to the next middleware
  } catch (error) {
    console.error("JWT decode error:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
