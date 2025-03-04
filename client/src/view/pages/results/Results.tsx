import { useJobs } from "./ResultsVM";
import JobCard from "../../components/jobCard/JobCard";
import styles from "./Results.module.scss";
import { useParams } from "react-router";

const Results = () => {
  const { userId } = useParams();
  const { jobIds, loading, error } = useJobs(userId);
  
  if (loading) return <p className={styles.loading}>Loading jobs...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.resultsContainer}>
      {jobIds.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        jobIds.map((jobId) => <JobCard key={jobId} jobId={jobId} />)
      )}
    </div>
  );
};

export default Results;
