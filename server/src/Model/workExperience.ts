import { model, Schema } from "mongoose";

export const WorkExperienceSchema = new Schema({
    jobName:String,
    jobTitle:String,
    jobType:String,
    startDate:Date,
    endDate:{
        type:Date,
        required:false
    },
    responsibility :String,

});

export const WorkExperienceModel=model("WorkExperience",WorkExperienceSchema);