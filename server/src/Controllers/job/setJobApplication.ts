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
    const userId = user._id;
    const jobEmployerModel = await EmployerJobModel.findOne({ jobId });

    if (!jobEmployerModel) {
      return res.status(400).json({ message: "invalid job" });
    }
    const employerId = jobEmployerModel.employerId;

    const newUserJob = await JobUserModel.create({
      userId: userId,
      employerId: employerId,
      messageToEmployer: message,
      status: jobUserStatus.pending,
    });
    console.log(newUserJob);

    return res.status(200).json({ message: "Application Registered" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching matched jobs", error });
  }
}
