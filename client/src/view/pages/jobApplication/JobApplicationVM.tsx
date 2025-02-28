import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "@reduxjs/toolkit/query";

const JobApplicationVM = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const user = useSelector((state: RootState) => state.user);  

  useEffect(() => {
    if (jobId) getJobById(jobId);
    console.log(user)
  }, []);

  async function getJobById(jobId: string) {
    try {
      const response = await fetch(`/api/jobs/${jobId}`);
      if (!response.ok) {
        throw new Error("Job not found");
      }
      const job = await response.json();
      console.log(job);
      setJob(job);
    } catch (error) {
      console.error("Error fetching job:", error);
    }
  }

  return { job, user };
};

export default JobApplicationVM;
