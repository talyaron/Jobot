import { useRef } from "react";
import { Job } from "../../../model/jobModel";
import { User } from "../../../model/userModel";

const JobInputBoxVm = () => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = (job: Job, user: User) => {
    if (textAreaRef.current === null) return;
    const message = textAreaRef.current.value;
    console.log("Message:", message);
    createApplicationInDB(job, user);
  };

  async function createApplicationInDB(job: Job, user: User) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/jobs/${job._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            job,
            user,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create application");
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating application:", error);
    }
  }
  return { textAreaRef, handleSubmit };
};

export default JobInputBoxVm;
