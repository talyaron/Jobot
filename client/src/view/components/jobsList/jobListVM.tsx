import { useState, useEffect } from "react";
import { Job } from "../../../model/jobModel";



const useJobListVM = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/jobs/get-job-by-id/:jobId");
      if (!response.ok) throw new Error("Failed to fetch jobs");

      const data: Job[] = await response.json();
      setJobs(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (jobId: string) => {
    console.log("Editing job:", jobId);
  };

  const handleDelete = async (jobId: string) => {
    try {
      const response = await fetch(`/api/jobs/delete-job-by-id/:jobId`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete job");

      setJobs(jobs.filter((job) => job._id !== jobId));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleArchive = (jobId: string) => {
    console.log("Archiving job:", jobId);
  };

  const viewApplicants = (jobId: string) => {
    console.log("Viewing applicants for job:", jobId);
  };

  return {
    jobs,
    loading,
    error,
    handleEdit,
    handleDelete,
    handleArchive,
    viewApplicants,
  };
};

export default useJobListVM;
