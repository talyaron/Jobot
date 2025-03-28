import { useEffect, useState } from "react";
import { useParams } from "react-router";

const JobApplicationVM = () => {
  const { applicationId } = useParams();
  const [application, setApplication] = useState<null|any>(null);


  useEffect(() => {
    if (applicationId) getJobById(applicationId);

  }, [applicationId]);

  async function getJobById(applicationId: string) {
    try {
      console.log(`/api/employer/get-application?applicationId=${applicationId}`)
      const response = await fetch(`/api/employer/get-application?applicationId=${applicationId}`,{
        credentials: "include",
      });

      //TODO: there is a bug here, the response is not ok, so it throws an error
      

      if (!response.ok) {
        const data = await response.json();
        console.log(data)
        console.error("Error fetching application:", data.error);
        throw new Error("Application not found");
      }
      const data = await response.json();
      console.log(data);
      // setApplication(data.application);
    } catch (error) {
      console.error("Error fetching application:", error);
    }
  }

  return { application };
};

export default JobApplicationVM;
