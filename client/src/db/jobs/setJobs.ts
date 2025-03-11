export const saveJob = async (jobId: string) => {
    try {

        const response = await fetch("http://localhost:3000/api/jobs/saved-jobs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ jobId }),
            credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to save job");

       
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};