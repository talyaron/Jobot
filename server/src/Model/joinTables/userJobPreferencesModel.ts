import { Schema, model } from "mongoose";

// Embedded Schema for user job preferences
const PreferencesSchema = new Schema({
  // Job location
  location: { type: String, required: true },

  // Job type (e.g., full-time, part-time, contract, temporary)
  jobType: { type: String, required: true },

  // Categories of jobs the user is interested in
  categories: { type: [String], required: true },

  // Skills relevant to the job
  skills: { type: [String], required: true },

  // User's work preferences
  jobHours: { type: [String], required: true },
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
