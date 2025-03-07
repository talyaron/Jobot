import { useEffect, useState } from "react";

export function usePersonalInformationVM() {


    // const sendDataToServer = async () => {
    //     try {
    //         const response = await fetch("https://your-api.com/work-experience", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(workExperienceCvData)
    //         });

    //         if (!response.ok) {
    //             throw new Error("שגיאה בשליחת הנתונים");
    //         }

    //         const data = await response.json();
    //         console.log("הנתונים נשלחו בהצלחה:", data);
    //     } catch (error) {
    //         console.error("שגיאה:", error);
    //     }
    // };

    useEffect(() => {
        // sendDataToServer();
      
    }, []);
    
    return {

    };
}
