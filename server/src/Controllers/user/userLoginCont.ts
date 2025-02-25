import { UserModel } from "../../Model/userModel";
import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';
import { secretKey } from "../../server";

export async function loginUser(req:any, res:any) {
  try {
    const { email, password } = req.body;
    
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    if(!user.password) throw new Error("Password of the user not found.")

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }


    const payload = { userId: user._id, email: user.email };
    const token = jwt.encode(payload, secretKey)
    res.cookie('user', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 1500000 });
    
    return res.status(200).json({ message: 'Login successful', user: user });
    
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}