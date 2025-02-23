export interface Education {
    institutionName: string;
    degree: string;
    studyYears: string;
}

import { useEffect, useState } from "react";

export function useEducationVM() {
    const [educationData, setEducationData] = useState<Education[]>([]);
    const [editingIndexEducation, setEditingIndexEducation] = useState<number | null>(null);
    const [formDataEducation, setFormDataEducation] = useState({
        institutionName: "",
        degree: "",
        studyYears: ""
    });

    const sendDataToServer = async () => {
        // try {
        //     const response = await fetch("https://your-api.com/education", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify(educationData)
        //     });

        //     if (!response.ok) {
        //         throw new Error("שגיאה בשליחת הנתונים");
        //     }

        //     const data = await response.json();
        //     console.log("הנתונים נשלחו בהצלחה:", data);
        // } catch (error) {
        //     console.error("שגיאה:", error);
        // }
    };

    useEffect(() => {
        // sendDataToServer();
    }, []);
    
    return {
        educationData, 
        setEducationData,
        editingIndexEducation, 
        setEditingIndexEducation,
        formDataEducation, 
        setFormDataEducation
    };
}