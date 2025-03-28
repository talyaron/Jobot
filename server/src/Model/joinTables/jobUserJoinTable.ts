import { Types, Schema, model } from "mongoose";
import { jobUserStatus } from "../utils/modelsEnums";

const JobUserSchema = new Schema({

  candidateId: { 
    type: Types.ObjectId,
     ref: 'User' 
  },
  employerId: { 
    type: Types.ObjectId,
     ref: 'User' 
  },
  jobId: {
    type: Types.ObjectId,
    ref: 'Job'
  },
  messageToEmployer: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: Object.values(jobUserStatus),
    default: jobUserStatus.PENDING,
  },
});

export const JobUserModel = model("jobUser", JobUserSchema);
