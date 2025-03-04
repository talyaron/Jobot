import { Types, Schema, model } from "mongoose";


const SavedJobsSchema = new Schema({
  userId: Types.ObjectId,
  jobId: Types.ObjectId,
  savedTime:Date,
})

export const SavedJobsModel = model("SavedJobs", SavedJobsSchema);
