import { useJobCard } from "./JobCardVM";
import styles from "./JobCard.module.scss";
import { Link } from "react-router-dom";
import { useJobs } from "../../pages/results/ResultsVM";

interface JobCardProps {
  jobId: string;
}

const JobCard: React.FC<JobCardProps> = ({ jobId }) => {
  const { job, loading, error } = useJobCard(jobId);
  const {saveJob} = useJobs();

  if (loading) return <p>Loading job details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!job) return <p>No job found.</p>;

  return (
    <div className={styles.card}>
      <Link to={`job-candidate/${jobId}`}

      >
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
      <button onClick={()=>saveJob(job._id)}>Save</button>
    </div>
  );
};

export default JobCard;
