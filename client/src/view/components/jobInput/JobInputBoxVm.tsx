import { useRef } from "react";
import { Job } from "../../../model/jobModel";
import { User } from "../../../model/userModel";

const JobInputBoxVm = () => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = (job: Job, user: User) => {
    if (textAreaRef.current === null) return;
    const message = textAreaRef.current.value;
    console.log("Message:", message);
    createApplicationInDB(message, job, user);
    console.log(job)

  };

  async function createApplicationInDB(message: string, job: Job, user: User) {
    try {

      const response = await fetch(
        `http://localhost:3000/api/job/setJobApplication`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
            job,
            user,
          }),
        }
      );

     const data= await response.json();
     console.log(data.message)

      if (!response.ok) {
        throw new Error("Failed to create application");
      }
    } catch (error) {
      console.error("Error creating application:", error);
    }
  }
  return { textAreaRef, handleSubmit };
};

export default JobInputBoxVm;
