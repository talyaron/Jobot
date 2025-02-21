import { Job } from "../../pages/jobCandidate/JobCandidateVM";

interface Props {
  job: Job;
}

const JobDetails: React.FC<Props> = ({ job }) => {
  return (
    <div>
      <h1>{job.jobName}</h1>
      <div>{job.details}</div>
    </div>
  );
};

export default JobDetails;
