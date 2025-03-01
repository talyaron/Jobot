import { Types, Schema, model } from "mongoose";
import { jobUserStatus } from "../utils/modelsEnums";

const JobUserSchema = new Schema({
  userId: Types.ObjectId,
  employerId: Types.ObjectId,
  messageToEmployer: {
    type: String,
    required: false,
  },
  status: Object.values(jobUserStatus),
});

export const JobUserModel = model("jobUser", JobUserSchema);
