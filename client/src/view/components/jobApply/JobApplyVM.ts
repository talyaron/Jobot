import { FormEvent } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

export function useJobApplyVM() {
  const { jobId } = useParams();
  const userId = useSelector((state: any) => state.user?._id);
  
  async function handelApply(event: FormEvent<HTMLFormElement>, message: string) {
    try {
      event.preventDefault();

      const jobData = {
        candidateId: userId,
        jobId: jobId,
        messageToEmployer: message
      };

      const response = await fetch(
        `http://localhost:3000/api/userJob/apply-job/${jobId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jobData),
        }
      );

      if (response.ok) {
        console.log("Applied successfully");
      } else {
        const errorData = await response.json();
        console.log("Error applying for the job:", errorData.message);
      }
    } catch (error) {
      console.error("Error applying for job:", error);
    }
  }

  async function checkIfLoggedIn(): Promise<boolean> {
    try {
      const response = await fetch("http://localhost:3000/api/auth/check-auth", { credentials: "include" });
      const data = await response.json();

      if (data.isLoggedIn) {
        console.log("User is logged in:", data.user);
        return true;
      } else {
        console.log("User is not logged in");
        return false;
      }
    } catch (error) {
      console.error("Error checking login status:", error);
      return false;
    }
  }

  return {
    handelApply,
    checkIfLoggedIn,
  };
}