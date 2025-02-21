import { Schema, model, Types } from "mongoose";
import { term } from "./EnumsModels";
import { locationType } from "./EnumsModels";

const JobSchema = new Schema({
    jobName: String,
    details: String,
    address: String,
    locationType:Object.values(locationType),
    location:Object.values(location),
    company: Types.ObjectId,
    employmentType: String,
    Industry: String,
    salary: Number,
    housingIncluded: Boolean,
    type: String,
    term: Object.values(term),
    benefits: String,
    websiteURL: {
      type: String,
      required: false,
    },
    createdAt: Date,
  });
  export const JobModel = model("Job", JobSchema);