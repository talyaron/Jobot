import { useState, useEffect } from "react";


export const useJobs = (userId?: string) => {
  const [jobIds, setJobIds] = useState<string[]>([]);
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchJobIds = async () => {
      const fetchUrl = userId
        ? `http://localhost:3000/api/matched-jobs/${userId}`
        : "http://localhost:3000/api/get-all-jobs";
      try {
        const response = await fetch(
          fetchUrl
        );
        if (!response.ok) throw new Error("Failed to fetch job IDs");

        const data = await response.json();
        console.log(data)
        setJobIds(data.jobs.map((job: any) => job._id)); // Get job IDs only
      } catch (err) {
        setError("Failed to fetch job IDs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobIds();
  }, []);

  const saveJob = async (jobId: string) => {
    try {
      if (!token) throw new Error("No authentication token found");

      const response = await fetch("http://localhost:3000/api/saved-jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
