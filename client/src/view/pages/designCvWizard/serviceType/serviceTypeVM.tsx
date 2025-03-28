export interface Service {
    serviceType: string;
    organizationName: string;
    serviceYears: string;
}

import { useEffect, useState } from "react";

export function useServiceTypeVM() {
    const [serviceData, setServiceData] = useState<Service[]>([]);
    const [editingIndexService, setEditingIndexService] = useState<number | null>(null);
    const [formDataService, setFormDataService] = useState({
        serviceType: "",
        organizationName: "",
        serviceYears: ""
    });

    const sendDataToServer = async () => {
        try {
            const response = await fetch("https://your-api.com/service", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(serviceData)
            });

            if (!response.ok) {
                throw new Error("שגיאה בשליחת הנתונים");
            }

            const data = await response.json();
            console.log("הנתונים נשלחו בהצלחה:", data);
        } catch (error) {
            console.error("שגיאה:", error);
        }
    };

    useEffect(() => {
        // sendDataToServer();
    }, []);
    
    return {
        serviceData, 
        setServiceData,
        editingIndexService, 
        setEditingIndexService,
        formDataService, 
        setFormDataService
    };
}