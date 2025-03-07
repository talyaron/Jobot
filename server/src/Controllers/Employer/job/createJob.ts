import { JobModel } from "../../../Model/jobModel";
import { EmployerJobModel } from "../../../Model/joinTables/employerJobJoinTable";
import { employerJobStatus } from "../../../Model/utils/modelsEnums";
import { secretKey } from "../../../server";
import jwt from "jwt-simple";

export async function createJob(req: any, res: any) {
    try {
            const token = req.cookies.user;
              if (!token) {
                return res.status(401).json({ message: "Unauthorized - No Token" });
              }
          
             
        const { jobName, details, address, location, locationType, company,
            employmentType, industry, salary, housingIncluded, type, term, benefits, websiteURL, createdAt } = req.body;

        // Check if all fields are provided
        if ([jobName, details, address, location, locationType, company, employmentType, industry, salary, housingIncluded, type, term, benefits, websiteURL, createdAt]
            .some(field => field === undefined || field === null || field === "")) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const decoded = jwt.decode(token, secretKey);
        const userId = decoded.userId;
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
        const jobId =_job._id;
       EmployerJobModel.create({
              employerId:userId,
              jobId:jobId,
              status:employerJobStatus.open,
        })
        console.log(_job);
        return res.json({ message: "job created!", job:_job });
        
    } catch (error) {
        console.error('Error creating new job:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}
