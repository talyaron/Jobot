import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const useMyJobs = () => {
  const [jobIds, setJobIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      
    const fetchSavedJobs = async () => {
      try {
        const token = Cookies.get("token"); // Get authentication token
        if (!token) {
          setError("No authentication token found");
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:3000/api/saved-jobs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch saved jobs");
        }

          const jobIds: string[] = await response.json();
         console.log(jobIds); 
        setJobIds(jobIds);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  // Function to remove a job from saved jobs
  const removeJob = async (jobId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/saved-jobs/${jobId}`, 
        {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete job");
      }

      // Delete job from state
      setJobIds((prevJobs) => prevJobs.filter((id) => id !== jobId));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return { jobIds, loading, error, removeJob };
};
