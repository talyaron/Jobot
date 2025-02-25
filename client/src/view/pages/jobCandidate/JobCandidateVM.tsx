import { useState } from "react";
import { Job } from "../../../model/jobModel";

export function useJobCandidateVM() {
  const [job, setJob] = useState<Job>();
  async function fetchJob(jobId: string) {
    try {
      fetch(`http://localhost:3000/api/jobs/job-details?jobId=${jobId}`, {
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

  return {
    job,
    fetchJob,
  };
}
