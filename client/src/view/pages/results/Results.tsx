import { useJobs } from "./ResultsVM";
import JobCard from "../../components/jobCard/JobCard";
import styles from "./Results.module.scss";
import { saveJob } from "../../../db/jobs/setJobs";

const Results = () => {
  const { jobs, loading, error } = useJobs();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (jobs.length === 0) return <p>No jobs found.</p>;

  return (
    <div className={styles.resultsContainer}>
      {jobs.map((job) => (
        <JobCard
          key={job._id}
          job={job}
          showSaveButton={true}
          onSave={saveJob}
        />
      ))}
    </div>
  );
};

export default Results;
