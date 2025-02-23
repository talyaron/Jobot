import { useEffect, useState } from "react";
import { WorkExperience } from "../../../../model/workExperienceModel";

export function useWorkExperienceVM() {
    const [workExperienceCvData, setWorkExperienceCvData] = useState<WorkExperience[]>([]);
      const [editingIndexWorkExperience, setEditingIndexWorkExperience] = useState<number | null>(null);
      const [formDataWorkExperience, setFormDataWorkExperience] = useState({
        jobName: "",
        jobTitle: "",
        jobType: "",
        startDate: "",
        endDate: "",
        responsibility: ""
      });


    const sendDataToServer = async () => {
        try {
            const response = await fetch("https://your-api.com/work-experience", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(workExperienceCvData)
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
        workExperienceCvData, setWorkExperienceCvData,
        editingIndexWorkExperience,setEditingIndexWorkExperience,
        formDataWorkExperience,setFormDataWorkExperience
    };
}
