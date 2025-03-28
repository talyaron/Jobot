import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "@reduxjs/toolkit/query";
import { userSelector } from "../../../redux/user/userSlice";

const JobApplicationVM = () => {
  const { applicationId } = useParams();
  const [job, setJob] = useState(null);
  const user = useSelector(userSelector);

  useEffect(() => {
    if (applicationId) getJobById(applicationId);
    console.log(user)
  }, []);

  async function getJobById(applicationId: string) {
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
