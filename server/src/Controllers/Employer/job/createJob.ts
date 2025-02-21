import { JobModel } from "../../../Model/jobModel";

export async function craeteJob(req: any, res: any) {
    try {
        const { jobName, details, address, location, locationType, company,
            employmentType, industry, salary, housingInclouded, type, term, benefits, website } = req.body;

        // Check all fileds
        if (!jobName || !details || !address || !location || !locationType || !company || !employmentType || !industry || !salary || !housingInclouded || !type || !term || !benefits || !website)
            return res.status(400).json({ error: "All fileds are required." });

        // Create new job by model
        const job = new JobModel({
            jobName,
            details,
            address,
            locationType,
            location,
            company,
            employmentType,
            Industry: industry,
            salary,
            housingIncluded: housingInclouded,
            type,
            term,
            benefits,
            websiteURL: website
        });

        job.save();
        return res.json({ message: "job created!" });

    } catch (error) {
        console.error('Error create new job:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}