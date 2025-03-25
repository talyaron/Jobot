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
        _id: String,
        institution: String,
        degree: String,
        studyYears: String,
    }],
    workExperience: [{
        _id: String,
        jobName: String,    
        jobTitle: String,    
        jobType: String,     
        startDate: Date,    
        endDate: { type: Date, required: false },
        responsibility: String, 
    }],
    serviceType:[{
        _id: String,
        serviceType: String,
        organizationName: String,
        serviceYears: String,
    }],
    skills: [{
        technicalSkills: String,
        spokenLanguages: String,
        _id: String
    }],

});

export const CvFormModel = model("CVForm", cvFormModel);