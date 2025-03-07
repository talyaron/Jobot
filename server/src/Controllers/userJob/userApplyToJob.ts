import { JobUserModel } from "../../Model/joinTables/jobUserJoinTable";

export async function applyToJob(req:any, res:any) {
  try {
    const { fullName, email } = req.body;
    const { jobId, userId } = req.body;
    await JobUserModel.create({
        jobId: jobId,
        userId: userId,
        status: 'pending'
    });
    return res.status(200).json({ message: 'Applied successfully' });
    
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}