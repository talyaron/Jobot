import { useState } from "react";
export interface Job { //delete this 
    jobName: string,
    details: string,
}
export function useJobCandidateVM() {
    const [job, setJob] = useState<Job>();
    async function fetchJob() {
        try {
           fetch("http://localhost:3000/api/jobs/job",{
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
