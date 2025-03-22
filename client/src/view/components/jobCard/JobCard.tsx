import styles from "./JobCard.module.scss";
import { Link } from "react-router-dom";
import { Job } from "../../../model/jobModel";

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
 

  if (!job) return <p>No Job Found</p>;

  return (
    <div className={styles.card}>
      <Link to={`job-candidate/${job._id}`} className={styles.link}>
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
    </div>
  );
};

export default JobCard;
