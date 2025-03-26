import { Types, model, Schema } from "mongoose";

const cvFormModel = new Schema({
    personalInformation:[{
        userId: String,
        jobId: String,
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
        id: String,
        institution: String,
        degree: String,
        studyYears: String,
    }],
    workExperience: [{
        id: String,
        jobName: String,    
        jobTitle: String,    
        jobType: String,     
        startDate: Date,    
        endDate: { type: Date, required: false },
        responsibility: String, 
    }],
    serviceType:[{
        id: String,
        serviceType: String,
        organizationName: String,
        serviceYears: String,
    }],
    skills: [{
        technicalSkills: String,
        spokenLanguages: String,
        id: String
    }],

});

export const CvFormModel = model("CVForm", cvFormModel);