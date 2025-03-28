import { useEffect, useState } from "react";

export function professionalSummaryVM() {
    const [professionalSummary, setProfessionalSummary] = useState("");

    const sendDataToServer = async () => {
        // API logic here
    };

    useEffect(() => {
        // sendDataToServer();
    }, []);
    
    return {
        professionalSummary,
        setProfessionalSummary
    };
}