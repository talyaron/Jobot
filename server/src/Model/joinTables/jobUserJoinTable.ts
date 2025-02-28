import { Types, Schema, model } from "mongoose";
import { jobUserStatus } from "../utils/modelsEnums";


const JobUserSchema = new Schema({
  userId: Types.ObjectId,
  employerId: Types.ObjectId,
  messageToEmployer:String,
  status: Object.values(jobUserStatus),
});

export const JobUserModel = model("JobUser", JobUserSchema);
