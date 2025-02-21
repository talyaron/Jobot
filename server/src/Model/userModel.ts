import  { model, Schema } from "mongoose";

const UserSchema = new Schema({
   
    userName:String,
    email:{
        type:String,
        unique:true,
    },
    password:String,
    phone:String,
});

export const UserModel = model('User',UserSchema);