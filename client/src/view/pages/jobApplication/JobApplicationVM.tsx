import { useEffect, useState } from "react";
import { useParams } from "react-router";

const JobApplicationVM = () => {
  const { applicationId } = useParams();
  const [application, setApplication] = useState(null);


  useEffect(() => {
    if (applicationId) getJobById(applicationId);

  }, [applicationId]);

  async function getJobById(applicationId: string) {
    try {
      const response = await fetch(`/api/employer/get-application?applicationId=&${applicationId}`,{
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Job not found");
      }
      const data = await response.json();
      console.log(data);
      setApplication(data.application);
    } catch (error) {
      console.error("Error fetching job:", error);
    }
  }

  return { application };
};

export default JobApplicationVM;
