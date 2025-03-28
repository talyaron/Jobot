import { Types, Schema, model } from "mongoose";

const EmployerUsersSchema = new Schema({
  userId: Types.ObjectId,
  employerId: Types.ObjectId,
});

export const EmployerUsersModel = model("EmployerUsers", EmployerUsersSchema);
