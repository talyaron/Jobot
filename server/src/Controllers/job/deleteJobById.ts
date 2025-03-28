import { JobModel } from "../../Model/jobModel";

export async function deleteJobById(req: any, res: any) {
  try {
    const jobId = req.params.jobId;
    
    const deletedJob = await JobModel.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}
