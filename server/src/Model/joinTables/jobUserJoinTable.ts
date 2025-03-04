import { Types, Schema, model } from "mongoose";
import { jobUserStatus } from "../utils/modelsEnums";

const JobUserSchema = new Schema({

  userId: { type: Types.ObjectId, ref: 'User' },
  employerId: { type: Types.ObjectId, ref: 'Job' },
  messageToEmployer: {
    type: String,
    required: false,
  },
  status: Object.values(jobUserStatus),
});

export const JobUserModel = model("jobUser", JobUserSchema);
