import { Types, model, Schema } from "mongoose";

const cvFormModel = new Schema({
    personalInformation:[{
        userId: String,
        firstName: String,
        lastName: String,
        email: String,
        phoneNumber: String,
        city: String,
    }],
    professionalSummary:{
        professionalSummary: String,
    },
    educations: [{
        institution: String,
        degree: String,
        studyYears: String,
    }],
    workExperience: [{
        jobName: String,    
        jobTitle: String,    
        jobType: String,     
        startDate: Date,    
        endDate: { type: Date, required: false },
        responsibility: String, 
    }],
    serviceType:[{
        serviceType: String,
        organizationName: String,
        serviceYears: String,
    }],
    skills: [{
        technicalSkills: String,
        spokenLanguages: String,
    }],

});

export const CvFormModel = model("CVForm", cvFormModel);