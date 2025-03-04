import { useState } from "react";
import { Job } from "../../../model/jobModel";
import { useParams } from "react-router";

export function useJobCandidateVM() {
  const { jobId } = useParams();
  const [job, setJob] = useState<Job>();
  async function fetchJob(jobId: string) {
    try {
      fetch(`http://localhost:3000/api/jobs/${jobId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => setJob(data.job))
        .catch((error) => console.error(error));
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }

  fetch(`http://localhost:3000/api/jobs/job-details?jobId=${jobId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      setJob(data.job)
    })
    .catch((error) => console.error(error));


  return {
    job
  };
}
