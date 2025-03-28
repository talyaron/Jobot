import { ApplicationModel } from "../../Model/joinTables/applicationModel";

export async function checkApplicationStatus(req:any, res:any){
    try {

        const { applicationId } = req.query;

        if (!applicationId )
            return res.status(400).json({ message: 'Missing applicationId' });


        const jobUser = await ApplicationModel.findById(applicationId)
            .populate("userId", "-password -__v")
            .populate("jobId", "-__v")
            .exec();


        if (!jobUser) {
            return res.status(400).json({ message: 'Application not found' });
        }

        return res.status(200).json({ message: 'jobUser:', jobUser });
    } catch (error) {
        console.error('Error during get application status:', error);
        return res.status(500).json({ message: 'Error in applicationStatus' });
    }
}