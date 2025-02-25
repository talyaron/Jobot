import { model, Schema } from "mongoose";

const EmployerSchema = new Schema({
    companyName:String,
    contactFullName:String,
    email:String,
    password:String,
    phoneNumber:String,
    companyLogoUrl:String,
})



export const EmployerModel = model("Employer",EmployerSchema);