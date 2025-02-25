import { useEffect, useState } from "react";

export interface PersonalInformation {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    city: string;
}

export function usePersonalInformationVM() {
    const [personalInformation, setPersonalInformation] = useState<PersonalInformation>({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        city: ""
    });

    // פונקציה לעדכון הנתונים בזמן אמת
    const updatePersonalInfo = (field: keyof PersonalInformation, value: string) => {
        setPersonalInformation((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    useEffect(() => {
        console.log("עדכון נתונים:", personalInformation);
    }, [personalInformation]); // הדפסת הנתונים כאשר הם מתעדכנים

    return { personalInformation, updatePersonalInfo };
}
