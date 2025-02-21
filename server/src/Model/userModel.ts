import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  fullName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  phoneNumber: String,
  aiData: String,
  workExperience: String,
  
  isHiring: Boolean,
  isCandidate: Boolean,
});

export const UserModel = model("User", UserSchema);
