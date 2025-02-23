import { useState, useEffect } from "react";

export const useJobs = (userId: string) => {
  const [jobIds, setJobIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobIds = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/matched-jobs/${userId}`
        );
        if (!response.ok) throw new Error("Failed to fetch job IDs");

        const data = await response.json();
        setJobIds(data.map((job: any) => job._id)); // Get job IDs only
      } catch (err) {
        setError("Failed to fetch job IDs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobIds();
  }, [userId]);

  return { jobIds, loading, error };
};
