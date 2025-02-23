import { useState, useEffect } from "react";
import { Job } from "../../../model/jobModel";

export const useJobCard = (jobId: string) => {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/job/${jobId}`);
        if (!response.ok) throw new Error("Failed to fetch job");

        const data = await response.json();
        setJob(data);
      } catch (err) {
        setError("Failed to fetch job");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  return { job, loading, error };
};
