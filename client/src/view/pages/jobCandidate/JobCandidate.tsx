import { useState } from "react";
import JobDetails from "../../components/jobDetails/JobDetails";
import { useJobCandidateVM } from "./JobCandidateVM";
import JobApply from "../../components/jobApply/JobApply";
import "./JobCandidate.nodule.scss";

const JobCandidate = () => {
  const { job, fetchJob } = useJobCandidateVM();
  const [isOpen, setIsOpen] = useState(false);

  return (
    //when press on job to show, it will pass jobId to fetchJob function
    //and then it will show the job details
    <div className="app-container">
      {job && <JobDetails job={job} />}
      <button className="open-button" onClick={() => setIsOpen(true)}>
        Apply to job
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <JobApply onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default JobCandidate;
