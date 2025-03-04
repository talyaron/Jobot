import { UserModel } from "../../Model/userModel";
import jwt from 'jwt-simple';
import { secretKey } from "../../server";



export const getUserProfile = async (req: any, res: any) => {
  try {
    const token = req.cookies.user; 

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token" });
    }

    const decoded = jwt.decode(token, secretKey); 
    const user = await UserModel.findById(decoded.userId).select("fullName email phoneNumber");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
