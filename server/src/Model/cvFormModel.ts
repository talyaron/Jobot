import { Types, model, Schema } from "mongoose";

const cvFormModel = new Schema({
    personalInformation:[{
        firstName: String,
        lastName: String,
        email: String,
        phoneNumber: String,
        address: String,
        dateOfBirth: Date,
    }]
    userId: Types.ObjectId,
    resume: String,
    coverLetter: String,
    skills: [String],
    experiences: [{
        company: String,
        position: String,
        startDate: Date,
        endDate: Date,
        description: String,
    }],
    educations: [{
        institution: String,
        degree: String,
        startDate: Date,
        endDate: Date,
        fieldOfStudy: String,
    }]
});

export const CVFormModel = model("CVForm", cvFormModel);