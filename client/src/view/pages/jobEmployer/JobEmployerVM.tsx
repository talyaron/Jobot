import { useEffect, useState } from "react";
import { Job } from "../../../model/jobModel";
import { User } from "../../../model/userModel";

interface Candidate {
    userId: User;
    messageToEmployer: string;
    _id: string;
}

export default function useJobEmployer(jobId: string) {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [job, setJob] = useState<Job | undefined>(undefined);

    async function getJob() {
        try {
            await fetch(`http://localhost:3000/api/job/${jobId}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => setJob(data as Job))
                .catch((error) => console.error(error));
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    }

    async function getCandidates() {
        try {
            await fetch(`http://localhost:3000/api/job/getCandidates/${jobId}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => setCandidates(data))
                .catch((error) => console.error(error));

            console.log(candidates);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    }

    useEffect(() => {
        getCandidates();
        getJob();
    }, [jobId]);

    return {
        candidates,
        job
    };
}
