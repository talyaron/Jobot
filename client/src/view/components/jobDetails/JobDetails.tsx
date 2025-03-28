import { Job } from "../../../model/jobModel";

interface Props {
  job: Job;
}

const JobDetails: React.FC<Props> = ({ job }) => {
  return (
    <div>
      <h1>{job.jobName}</h1>
      <div>{job.details}</div>
      <div> location: {job.address}</div>
      <div> salary:{job.salary}</div>
      <div>for more details {job.websiteURL}</div>
    </div>
  );
};

export default JobDetails;
