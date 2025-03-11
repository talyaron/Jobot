
import styles from "./JobCard.module.scss";
import { Link } from "react-router-dom";
import { saveJob } from "../../../db/jobs/setJobs";
import { useState } from "react";
import { Job } from "../../../model/jobModel";

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
 

  const [jobAdded, setJobAdded] = useState<boolean>(false);


  function handleSaveJob() {
    saveJob(job._id);
    setJobAdded(true);
  }

  return (
    <div className={styles.card} style={{ border: jobAdded ? "2px solid green" : "none" }}>
      <Link to={`job-candidate/${job._id}`}>
        <h3 className={styles.jobTitle}>{job.jobName}</h3>
        <p className={styles.details}>
          <strong>Company:</strong> {job.company}
        </p>
        <p className={styles.details}>
          <strong>Details:</strong> {job.details}
        </p>
        <p>
          <strong>Location:</strong> {job.location.toString()}
        </p>
        <p>
          <strong>Employment Type:</strong> {job.employmentType}
        </p>
        <p>
          <strong>Salary:</strong> ${job.salary}
        </p>
      </Link>
      <button onClick={handleSaveJob}>Save</button>
    </div>
  );
};

export default JobCard;
