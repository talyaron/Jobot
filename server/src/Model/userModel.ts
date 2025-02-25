import { model, Schema } from "mongoose";
import { WorkExperienceSchema } from "./workExperience"; 

const UserSchema = new Schema({
  fullName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  phoneNumber: String,
  aiData: String,
  workExperience: [{ type: WorkExperienceSchema }],  
  isHiring: Boolean,
  isCandidate: Boolean,
});

export const UserModel = model("User", UserSchema);
