import { useJobCard } from "./JobCardVM";
import styles from "./JobCard.module.scss";

interface JobCardProps {
  jobId: string;
}

const JobCard: React.FC<JobCardProps> = ({ jobId }) => {
  const { job, loading, error } = useJobCard(jobId);

  if (loading) return <p>Loading job details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!job) return <p>No job found.</p>;

  return (
    <div
      className={styles.card}
      onClick={() => (window.location.href = `/job/${jobId}`)}
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
    </div>
  );
};

export default JobCard;
