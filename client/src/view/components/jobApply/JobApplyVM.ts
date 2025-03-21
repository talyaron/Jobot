import { FormEvent, useState } from "react";
import { Job } from "../../../model/jobModel";

export function useJobApplyVM() {
  const [job, setJob] = useState<Job>();

  async function handelApply(event: FormEvent<HTMLButtonElement>) {
    try {
      event.preventDefault();
      const form = event.currentTarget.form;
      if (form) {
        const formData = new FormData(form);
        const jobData = {
          fullName: formData.get("fullName") as string,
          email: formData.get("email") as string,
        };
        const response = await fetch(
          `http://localhost:3000/api/jobs/jobApply`,
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
          console.log("Error applying for the job");
        }
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
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
