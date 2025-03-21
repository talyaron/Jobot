import { useEffect, useState } from "react";
import { userSelector } from "../../../redux/user/userSlice";
import { useSelector } from "react-redux";
import { Job } from "../../../model/jobModel";


export const useMyJobs = () => {

  const user = useSelector(userSelector);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
  
    if (user._id !== '')fetchSavedJobs();
  }, [user]);

  // Function to remove a job from saved jobs
  const removeJob = async (jobId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/jobs/user-jobs/${jobId}`,
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
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const fetchSavedJobs = async () => {
    try {

      const response = await fetch("http://localhost:3000/api/jobs/user-jobs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch saved jobs");
      }

      const jobs: Job[] = await response.json();
   
      setJobs(jobs);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };
  return { jobs, loading, error, removeJob };
};


