import { useState, useEffect } from "react";
import { Job } from "../../../model/jobModel";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.user);

  const fetchJobIds = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/user/matched-jobs/`,
        { method: "GET", credentials: "include" }
      );
      if (!response.ok) throw new Error("Failed to fetch job IDs");

      const data = await response.json();
      console.log(data);
      if(data.filtered)
      setJobs(data.filtered);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch job IDs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.userId) return;
    fetchJobIds();
  }, [user]);

  return { jobs, loading, error };
};
