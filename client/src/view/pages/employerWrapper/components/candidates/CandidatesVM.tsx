import { useEffect, useState } from "react";

export function useCandidates() {


    const [candidates, setCandidates] = useState([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:3000/api/employer/jobs/get-candidates-by-employer-id', { credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setCandidates(data.candidates)
            });
    }, []);
    try {
        return { candidates };
    } catch (e: any) {
        console.error(error);
        setError(e.message);
        return { error }
    }
}
