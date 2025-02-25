import { JobModel } from "../../Model/jobModel";

export async function getJobDetails(req: any, res: any) {
  try {
    const jobId = req.params.id;
    const job = await JobModel.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}
