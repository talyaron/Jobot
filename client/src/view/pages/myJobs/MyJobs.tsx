import React from "react";
import { useMyJobs } from "./MyJobsVM";
import styles from "./MyJobs.module.scss";
import JobCard from "../../components/jobCard/JobCard";
import { Link } from "react-router";

export const MyJobs: React.FC = () => {
  const { jobs, loading, error, removeJob } = useMyJobs();

  if (loading) {
    return <p className={styles.loading}>Loading saved jobs...</p>;
  }

  if (error) {
    return <p className={styles.error}>Error: {error}</p>;
  }

  return (
    <div className={styles.myJobsContainer}>
      <h1 className={styles.title}>My Saved Jobs</h1>
      {jobs.length > 0 ? (
        <div className={styles.jobsList}>
          {jobs.map((job) => (
            <div className={styles.jobItem}>
              <JobCard job={job} key={job._id} />
              <button
                className={styles.deleteButton}
                onClick={() => removeJob(job._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.noJobs}>No saved jobs found.</p>
      )}
      <div className="btns">
        <Link to="/">
          <button className="btn">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  );
};
