import { JobModel } from "../../Model/jobModel";

export const getJobById = async (req: any, res: any) => {
  try {
    const { jobId } = req.params;
    const job = await JobModel.findById(jobId).populate("company").lean();
    console.log(job);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job", error });
  }
};
