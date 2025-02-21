<<<<<<< Updated upstream
import React from 'react'

const Results = () => {
  return (
    <div>
      
    </div>
  )
}

export default Results
=======
import { useJobs } from "./ResultsVM";

const Results = () => {
  const { jobs, loading, error } = useJobs();

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Job Results</h2>
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li
              key={job._id}
              style={{ borderBottom: "1px solid #ddd", padding: "10px" }}
            >
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
                <strong>Housing Included:</strong>{" "}
                {job.housingIncluded ? "Yes" : "No"}
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
                  <a
                    href={job.websiteURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Company Website
                  </a>
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Results;
>>>>>>> Stashed changes
