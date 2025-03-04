import { JobModel } from "../../../Model/jobModel";

export async function createJob(req: any, res: any) {
    try {
        const { jobName, details, address, location, locationType, company,
            employmentType, industry, salary, housingIncluded, type, term, benefits, websiteURL, createdAt } = req.body;

        // Check if all fields are provided
        if ([jobName, details, address, location, locationType, company, employmentType, industry, salary, housingIncluded, type, term, benefits, websiteURL, createdAt]
            .some(field => field === undefined || field === null || field === "")) {
            return res.status(400).json({ error: "All fields are required." });
        }
        console.log("idan")
        // Create new job using the model
        const job = new JobModel({
            jobName,
            details,
            address,
            locationType,
            location,
            company,
            employmentType,
            industry,
            salary,
            housingIncluded,
            type,
            term,
            benefits,
            websiteURL,
            createdAt: createdAt || new Date()
        });

        const _job = await job.save();
        console.log(_job);
        return res.json({ message: "job created!", job:_job });
        
    } catch (error) {
        console.error('Error creating new job:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}
