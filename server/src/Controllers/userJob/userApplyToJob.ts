import { JobModel } from "../../Model/jobModel";
import { EmployerJobModel } from "../../Model/joinTables/employerJobJoinTable";
import { JobUserModel } from "../../Model/joinTables/jobUserJoinTable";

export async function applyToJob(req: any, res: any) {
  try {
    const { candidateId, messageToEmployer } = req.body;
    const { jobId } = req.params;

    console.log(candidateId, messageToEmployer, jobId);

    const job = await JobModel.findById(jobId).populate("employer");
    if (!job) {
      return res.status(400).json({ message: "Job not found" });
    }

    const employerJob = await EmployerJobModel.findOne({ jobId }).exec();
    if (!employerJob) {
      return res.status(400).json({ message: "EmployerJob not found for the provided jobId" });
    }

    const employerResult = await EmployerJobModel.findOne({ jobId }).exec();
    if (!employerResult) {
      return res.status(400).json({ message: "EmployerJob not found for the provided jobId" });
    }

    const employerId = employerResult.employerId;
    if (!employerId) {
      return res.status(400).json({ message: "Employer ID not found for this job" });
    }

    await JobUserModel.create({
      candidateId,
      jobId,
      messageToEmployer,
      employerId
    });

    return res.status(200).json({ message: 'Applied successfully', employerId: employerId.toString()});
  } catch (error) {
    console.error('Error applying to job:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
