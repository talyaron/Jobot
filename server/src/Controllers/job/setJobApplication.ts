import { EmployerJobModel } from "../../Model/joinTables/employerJobJoinTable";
import { JobUserModel } from "../../Model/joinTables/jobUserJoinTable";
import { jobUserStatus } from "../../Model/utils/modelsEnums";

export async function setJobApplication(req: any, res: any) {
  try {
    const { message, job, user } = req.body;

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!job) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const jobId = job._id;

    const jobEmployerModel = await EmployerJobModel.findOne({ jobId });
    
    if (!jobEmployerModel) {
      return res.status(400).json({ message: "invalid job" });
    }
    console.log(message, job, user);

    const newUserJob = new JobUserModel({
      employerId: jobEmployerModel.employerId,
      userId: user._id,
      messageToEmployer: message,
      status: jobUserStatus.pending,
    });
    newUserJob.validate();
    return res.status(200).json({ message: "Application Registered" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching matched jobs", error });
  }
}
