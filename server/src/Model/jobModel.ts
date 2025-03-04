import { Types, model, Schema } from "mongoose";
import { employmentType, location, locationType, term } from "./utils/modelsEnums";


const JobSchema = new Schema({
  jobName: String,
  details: String,
  address: String,
  locationType:Object.values(locationType),
  location:Object.values(location),
  company: Types.ObjectId,
  employmentType: Object.values(employmentType),
  Industry: String,
  salary: Number,
  housingIncluded: Boolean,
  type: String,
  term: {
    type: String,
    enum: Object.values(term)
  },
  benefits: String,
  websiteURL: {
    type: String,
    required: false,
  },
  createdAt: Date,
});

export const JobModel = model("Job", JobSchema);
