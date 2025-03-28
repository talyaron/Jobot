import React from "react";
import useJobListVM from "./jobListVM";
import styles from "./jobList.module.css";

const JobList = () => {
  const { jobs, handleEdit, handleDelete, handleArchive, viewApplicants } = useJobListVM();

  return (
    <div className="jobList">
      <h1 className="jobList-header">Job Listings</h1>
      <div className="jobListGrid">
        {jobs.map((job) => (
          <div key={job._id} className="job">
            <h2 className="job-name">{job.jobName}</h2>
            <button onClick={() => handleEdit(job._id)}>Edit</button>
            <button onClick={() => handleDelete(job._id)}>Delete</button>
            <button onClick={() => handleArchive(job._id)}>Archive</button>
            <button onClick={() => viewApplicants(job._id)}>View Applicants</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
