import { UserJobPreferencesModel } from "../../Model/joinTables/userJobPreferencesModel";
import { JobModel } from "../../Model/jobModel";

// Fetch jobs dynamically based on user preferences
export const getMatchedJobs = async (req: any, res: any) => {
  try {
    const userId = req.body.userId || req.userId;
    console.log(userId);

    const userPreferences = await UserJobPreferencesModel.findOne({
      userId,
    }).lean();

    console.log(userPreferences);

    if (!userPreferences || !userPreferences.preferences) {
      return res.status(404).json({ message: "User preferences not found" });
    }

    // Construct filters dynamically based on non-empty preferences
    const filters = Object.fromEntries(
      Object.entries(userPreferences.preferences)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([key, value]) => [
          key,
          key === "salary" ? { $gte: value } : value,
        ])
    );

    console.log("Filters for job search:", filters);

    // Find only job IDs that match the user's preferences
    const matchedJobs = ((await JobModel.find(filters).select("_id")));
    const jobIdsAsString = matchedJobs.map((job) => job._id.toString());

    res.status(200).json(jobIdsAsString);
  } catch (error) {
    res.status(500).json({ message: "Error fetching matched jobs", error });
  }
};
