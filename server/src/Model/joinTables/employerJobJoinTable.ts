import { Types,Schema, model } from "mongoose";
import { employerJobStatus } from "../utils/modelsEnums";


const EmployerJobSchema = new Schema({
  employerId:Types.ObjectId,
  jobId:Types.ObjectId,
  status: Object.values(employerJobStatus),
})

export const EmployerJobModel = model("EmployerJob",EmployerJobSchema);