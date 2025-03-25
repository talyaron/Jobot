import { useState, useEffect } from "react";
import { Job } from "../../../model/jobModel";


export const useJobs = (userId?: string) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchJobIds = async () => {
      const fetchUrl = userId
        ? `http://localhost:3000/api/jobs/matched-jobs/${userId}`
        : "http://localhost:3000/api/jobs/get-all-jobs";
      try {
        const response = await fetch(fetchUrl
        );
        if (!response.ok) throw new Error("Failed to fetch job IDs");

        const data = await response.json();
        console.log(data)
        setJobs(data.jobs); 
      } catch (err) {
        console.error(err);
        setError("Failed to fetch job IDs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobIds();
  }, []);

  const saveJob = async (job: Job) => {
    try {
    
      const response = await fetch("http://localhost:3000/api/saved-jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({jobId: job._id }),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to save job");

      setSavedJobs((prev) => [...prev, job]);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return { jobs, savedJobs, loading, error, saveJob };
};
