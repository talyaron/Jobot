import { SavedJobsModel } from "../../Model/joinTables/savedJobsJoinTable";

export async function getSavedJobsByUserID(req: any, res: any) {
  try {

    const userId = req.body.userId || req.userId; // Extract userId from middleware

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find all saved jobs by userId
    const savedJobs = await SavedJobsModel.find({ userId }).select("jobId");

    if (!savedJobs.length) {
      return res.status(404).json({ message: "No saved jobs found" });
    }

    // Extract jobIds and convert them to string
    const jobIds = savedJobs
      .map((job) => (job.jobId ? job.jobId.toString() : null))
      .filter((id) => id !== null);

    return res.status(200).json(jobIds);
  } catch (error) {
    console.error("Error fetching saved jobs:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

// Remove a saved job by userId and jobId
export async function removeSavedJob(req: any, res: any) {
  try {

    const userId = req.body.userId || req.userId; // Extract userId from middleware
    const jobId = req.params.jobId || req.body.jobId; // Extract jobId from params or body

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    // Delete the saved job for the given user
    const deletedJob = await SavedJobsModel.findOneAndDelete({ userId, jobId });


    if (!deletedJob) {
      return res
        .status(404)
        .json({ message: "Job not found or not saved by user" });
    }

    return res.status(200).json({ message: "Job successfully removed" });
  } catch (error) {
    console.error("Error removing saved job:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
