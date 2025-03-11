import { useState, useEffect } from "react";
import { Job } from "../../../model/jobModel";



export const useJobs = (userId?: string) => {
  const [jobs, setJobs] = useState<Job[]>([]);
 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchJobIds = async () => {
      const fetchUrl = userId
        ? `http://localhost:3000/api/jobs/matched-jobs`
        : "http://localhost:3000/api/jobs/get-all-jobs";
      try {
        const response = await fetch(
          fetchUrl
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


  return { jobs, loading, error };
};
