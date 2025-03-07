import { JobModel } from "../../../Model/jobModel";
import jwt from "jwt-simple";
import { secretKey } from "../../../server";
import { EmployerJobModel } from "../../../Model/joinTables/employerJobJoinTable";
import { Types } from "mongoose";

export async function getAllJobs(req: any, res: any) {
  try {
    const jobs = await JobModel.find();
    return res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
export const getJobsByEmployer = async (req: any, res: any) => {
  try {
    const token = req.cookies.user;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token" });
    }

    const decoded = jwt.decode(token, secretKey);
    const userId = decoded.userId;
    const jobsEmployer = await EmployerJobModel.find({ employerId: userId }) 
    .exec();

    const jobIds = jobsEmployer.map(job => job.jobId); 
    const jobs = await JobModel.find({ _id: { $in: jobIds } }); 
    console.log(jobs)
    res.status(200).json( jobs );
  } catch (error) {
    res.status(500).json({ message: "Error fetching job", error });
  }
};
