import { Types, Schema, model } from "mongoose";

const SavedJobsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',  // assuming you have a User model
    required: true
  },
  jobId: {
    type: Schema.Types.ObjectId,
    ref: 'Job',   // assuming you have a Job model
    required: true
  },
  savedAt: {
    type: Date,
    default: Date.now
  }
});

export const SavedJobsModel = model("SavedJobs", SavedJobsSchema);