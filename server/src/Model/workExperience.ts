import { model, Schema } from "mongoose";

const WorkExperienceSchema = new Schema({
    jobName:String,
    jobTitle:String,
    jobType:String,
    startDate:Date,
    endDate:{
        type:Date,
        require:false
    },
    responsibility :String,

})

export const WorkExperienceModel=model("WorkExperience",WorkExperienceSchema);