import { JobModel } from "../../Model/jobModel";
import { ApplicationModel } from "../../Model/joinTables/applicationModel";


export const getJobById = async (req: any, res: any) => {
  try {
    const { jobId } = req.params;
    const job = await JobModel.findById(jobId);
  
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job", error });
  }
};

export const getAllJobs = async (req: any, res: any) => {
  try {
    const jobs = await JobModel.find({});

    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ message: "Error fetching job", error });
  }
};


export const getCandidatesByEmployerId = async (req: any, res: any) => {
  try {
    // const userId = req.userId;
    const userId = "67dde52ea02050a125ee632e"; //just for development
    if(!userId) return res.status(401).json({message: "Unauthorized"});

    const candidatesDB = await ApplicationModel.find({ employerId: userId })
      .populate({
        path: 'candidateId',
        select: '-password -__v -_doc' // Exclude password and metadata
      })
      .populate({
        path: 'jobId',
        select: '-__v -_doc' // Exclude metadata
      });

    const candidates = candidatesDB.map((candidate) => {
      return {
        applicationId: candidate._id,
        candidate: candidate.candidateId,
        job: candidate.jobId
      };
    });

    res.status(200).json({candidates});
  } catch (error) {
    res.status(500).json({ message: "Error fetching candidates", error });
  }
}
