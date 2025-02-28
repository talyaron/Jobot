import { useEffect, useState } from "react";
import { Job } from "../../../model/jobModel";
import { User } from "../../../model/userModel";

export default function useJobEmployer(job: Job) {
    const [candidates, setCandidates] = useState<User[]>([]);

    function getCandidates() {
        try {
            fetch("http://localhost:3000/api/jobs/candidates", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => setCandidates(data.candidates as User[]))
                .catch((error) => console.error(error));
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    }

    useEffect(() => {
        getCandidates();
    }, [job]);

    return {
        candidates,
    };
}
