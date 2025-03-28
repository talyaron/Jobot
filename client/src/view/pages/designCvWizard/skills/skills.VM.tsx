// skillsModel.ts
export interface Skill {
    technicalSkills: string;
    spokenLanguages: string;
}

// skillsVM.ts
import { useEffect, useState } from "react";

export function useSkillsVM() {
    const [skillsData, setSkillsData] = useState<Skill[]>([]);
    const [editingIndexSkills, setEditingIndexSkills] = useState<number | null>(null);
    const [formDataSkills, setFormDataSkills] = useState({
        technicalSkills: "",
        spokenLanguages: ""
    });

    const sendDataToServer = async () => {
        // try {
        //     const response = await fetch("https://your-api.com/skills", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify(skillsData)
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
        skillsData, 
        setSkillsData,
        editingIndexSkills, 
        setEditingIndexSkills,
        formDataSkills, 
        setFormDataSkills
    };
}