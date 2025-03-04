import React from "react";
import { useMyJobs } from "./MyJobsVM";
import styles from "./MyJobs.module.scss";
import JobCard from "../../components/jobCard/JobCard";

export const MyJobs: React.FC = () => {
  const { jobIds, loading, error, removeJob } = useMyJobs();

  if (loading) {
    return <p className={styles.loading}>Loading saved jobs...</p>;
  }

  if (error) {
    return <p className={styles.error}>Error: {error}</p>;
  }

  return (
    <div className={styles.myJobsContainer}>
      <h1 className={styles.title}>My Saved Jobs</h1>
      {jobIds.length > 0 ? (
        <div className={styles.jobsList}>
          {jobIds.map((jobId) => (
            <div key={jobId} className={styles.jobItem}>
              <JobCard jobId={jobId} />
              <button
                className={styles.deleteButton}
                onClick={() => removeJob(jobId)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.noJobs}>No saved jobs found.</p>
      )}
    </div>
  );
};
