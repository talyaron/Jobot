import { JobModel } from "../../../Model/jobModel";

export async function getAllJobs(req: any, res: any) {
    try {
        const jobs = await JobModel.find();
        return res.json(jobs);
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return res.status(500).json({ message: "Server error" });
    }
}