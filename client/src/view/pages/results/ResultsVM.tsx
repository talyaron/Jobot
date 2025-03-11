import { useState, useEffect } from "react";


export const useJobs = (userId?: string) => {
  const [jobIds, setJobIds] = useState<string[]>([]);
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchJobIds = async () => {
      const fetchUrl = userId
        ? `http://localhost:3000/api/jobs/matched-jobs/${userId}`
        : "http://localhost:3000/api/jobs/get-all-jobs";
      try {
        const response = await fetch(
          fetchUrl
        );
        if (!response.ok) throw new Error("Failed to fetch job IDs");

        const data = await response.json();
        console.log(data)
        setJobIds(data.jobs.map((job: { _id: string }) => job._id)); // Get job IDs only
      } catch (err) {
        console.error(err);
        setError("Failed to fetch job IDs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobIds();
  }, []);

  const saveJob = async (jobId: string) => {
    try {
    
      const response = await fetch("http://localhost:3000/api/saved-jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobId }),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to save job");

      setSavedJobIds((prev) => [...prev, jobId]);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return { jobIds, savedJobIds, loading, error, saveJob };
};
