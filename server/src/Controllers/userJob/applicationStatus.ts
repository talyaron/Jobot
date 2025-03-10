import { JobUserModel } from "../../Model/joinTables/jobUserJoinTable";

export async function checkApplicationStatus(req:any, res:any){
    try {
        const { jobId } = req.params;
        const { userId, candidateId } = req.body;

        if ( !jobId || !candidateId || !userId )
            return res.status(400).json({ message: 'Missing required fields' });

        const jobUser = await JobUserModel.findOne({ 
            jobId,
            candidateId,
            userId
        });

        if (!jobUser) {
            return res.status(404).json({ message: 'jobUser not found' });
        }

        return res.status(200).json({ message: 'jobUser:', jobUser });
    } catch (error) {
        console.error('Error during get application status:', error);
        return res.status(500).json({ message: 'Error in applicationStatus' });
    }
}