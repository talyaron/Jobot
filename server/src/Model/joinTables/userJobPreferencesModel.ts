import { Schema, model, Types } from "mongoose";
import {
  locationType,
  location,
  employmentType,
  term,
} from "../utils/modelsEnums";

// Embedded Schema for user job preferences
const PreferencesSchema = new Schema({
  // Job name selected from the list of available job titles
  jobName: { type: String },

  // Location type selected from predefined options: "on-site", "remote", "hybrid"
  locationType: { type: String, enum: Object.values(locationType) },

  // Location selected from predefined list in modelsEnums.ts
  location: { type: String, enum: Object.values(location) },

  // Reference to the employer model, linking to a specific company
  company: { type: Types.ObjectId, ref: "Employer" },

  // Employment type selected from predefined options: "full-time", "part-time", "contract", "temporary"
  employmentType: { type: String, enum: Object.values(employmentType) },

  // Industry selected by the user from available categories
  Industry: { type: String },

  // Expected salary, will be used for filtering jobs with greater or equal salary ($gte)
  salary: { type: Number, min: 0 },

  // Boolean value indicating whether housing is included in the job offer
  housingIncluded: { type: Boolean },

  // Job term selected from predefined options: "short", "long"
  term: { type: String, enum: Object.values(term) },
});

// Main schema for storing user job preferences
const UserJobPreferencesSchema = new Schema({
  // Reference to the user who owns these preferences
  userId: {
    type: String,
    required: true,
    unique: true, // Ensures one set of preferences per user
  },

  // Embedding the preferences schema
  preferences: PreferencesSchema,
});

export const UserJobPreferencesModel = model(
  "UserJobPreferences",
  UserJobPreferencesSchema
);
