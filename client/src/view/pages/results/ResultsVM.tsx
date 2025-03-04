import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const useJobs = () => {
  const [jobIds, setJobIds] = useState<string[]>([]);
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token = Cookies.get("token"); // Get authentication token from cookies
  console.log(token);

  useEffect(() => {
    const fetchJobIds = async () => {
      try {
        if (!token) throw new Error("No authentication token found");

        const response = await fetch("http://localhost:3000/api/matched-jobs", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch job IDs");

        const data = await response.json();
        console.log("Fetched jobs:", data);
        setJobIds(data); // Get job IDs from response
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
