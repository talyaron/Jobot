import { SavedJobsModel } from "../../Model/joinTables/savedJobsJoinTable";

export async function saveJobForUser(req: any, res: any) {
  try {
    const userId = req.body.userId || req.userId;
    const jobId = req.body.jobId;

    if (!userId || !jobId) {
      return res
        .status(400)
        .json({ message: "User ID and Job ID are required" });
    }

    // Check if job is already saved
    const existingJob = await SavedJobsModel.findOne({ userId, jobId });
    if (existingJob) {
      return res.status(409).json({ message: "Job already saved" });
    }

    // Save job
    const savedJob = new SavedJobsModel({ userId, jobId, savedAt: new Date() });
    await savedJob.save();

    return res.status(201).json({ message: "Job saved successfully" });
  } catch (error) {
    console.error("Error saving job:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
