<<<<<<< Updated upstream
export function useResultsVM() {
 
}
=======
import { useEffect, useState } from "react";
import { Job } from "../../model/JobModel";

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/jobs");

        if (!response.ok) {
          const errorData = await response.json(); 
          throw new Error(errorData.message || "Failed to fetch jobs");
        }

        const data: Job[] = await response.json();
        setJobs(data);
        setError(null); // If response is successful, clear the error
      } catch (err) {
        // If an error occurred, set the error message
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false); // Hide the loading spinner
      }
    };

    fetchJobs();
  }, []);

  return { jobs, loading, error };
};
>>>>>>> Stashed changes
