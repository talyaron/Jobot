import { useJobs } from "./ResultsVM";
import JobCard from "../../components/jobCard/JobCard";
import styles from "./Results.module.scss";
import { useParams } from "react-router";

const Results = () => {
  const { jobIds, loading, error } = useJobs();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (jobIds.length === 0) return <p>No jobs found.</p>;

  return (
    <div className={styles.resultsContainer}>
      {jobIds.map((jobId) => (
          <JobCard key={jobId} jobId={jobId} />
      ))}
    </div>
  );
};

export default Results;
