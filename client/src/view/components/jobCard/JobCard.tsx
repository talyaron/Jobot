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
    <div className={styles.card}>
      <h3>{job.jobName}</h3>
      <p>
        <strong>Details:</strong> {job.details}
      </p>
      <p>
        <strong>Address:</strong> {job.address}
      </p>
      <p>
        <strong>Location:</strong> {job.location}
      </p>
      <p>
        <strong>Employment Type:</strong> {job.employmentType}
      </p>
      <p>
        <strong>Industry:</strong> {job.Industry}
      </p>
      <p>
        <strong>Salary:</strong> ${job.salary}
      </p>
      <p>
        <strong>Housing Included:</strong> {job.housingIncluded ? "Yes" : "No"}
      </p>
      <p>
        <strong>Type:</strong> {job.type}
      </p>
      <p>
        <strong>Term:</strong> {job.term}
      </p>
      <p>
        <strong>Benefits:</strong> {job.benefits}
      </p>
      {job.websiteURL && (
        <p>
          <a href={job.websiteURL} target="_blank" rel="noopener noreferrer">
            Company Website
          </a>
        </p>
      )}
    </div>
  );
};

export default JobCard;
