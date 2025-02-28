import { JobUserModel } from "../../Model/joinTables/jobUserJoinTable";
import { UserModel } from "../../Model/userModel";

export const getCandidatesByJobId = async (req: any, res: any) => {
    try{
        const { jobId } = req.params;
        const jobCandidates = await JobUserModel.find({ employerId: jobId });
        const userPromises = jobCandidates.map(async (jobCandidate: any) => {
            return await UserModel.findById(jobCandidate.userId); 
        });

        const candidates = await Promise.all(userPromises);
        if (!candidates) {
            return res.status(404).json({ message: "candidates not found" });
        }
          res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json({ message: "Error fetching candidates", error });
    }
}