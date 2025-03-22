import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../redux/store";
// import { fetchCvForm } from "../../../../redux/cv/cvSlice"; // ייבוא הפעולה
import { addEducation, addSkills, removeEducation, updateEducation, updatePersonalInformation, updateProfessionalSummary } from "../../../../redux/cv/cvSlice"

export const useAllComponentsVM = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isCvFill, setIsCvFill] = useState(false);
  const [userId, setUserId] = useState(""); // שמור userId במצב
  const cvForm = useSelector((state: RootState) => state.cvForm);

  async function getUserId() {
    try {
      const response = await fetch(`http://localhost:3000/api/user/profile`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch user");
      const data = await response.json();
      setUserId(data._id); // עדכן את משתנה המצב
      console.log(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  async function getMyCvForm() {
    if (!userId) return;
    try {
      const response = await fetch(`http://localhost:3000/api/cv/getCvForm/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch user");
      const data = await response.json();
      console.log("CV data:", data);
      
      // טפל במבנה הנתונים כראוי
      if (data.personalInformation) {
        // אם זה מערך, קח את הפריט הראשון
        const personalInfo = Array.isArray(data.personalInformation) 
          ? data.personalInformation[0] 
          : data.personalInformation;
          
        dispatch(updatePersonalInformation(personalInfo));
      }

      if (data.professionalSummary){
        const professionalSummary = data.professionalSummary

        dispatch(updateProfessionalSummary(professionalSummary));
      }

      if (data.skills) {
        console.log("Skills from server:", data.skills); // בדיקה אם הנתונים מתקבלים
        data.skills.forEach((skill) => {
            dispatch(addSkills(skill));
        });
    }
    

      // if (data.workExperience) {
      //   data.workExperience.forEach((workExperience) => {
      //     dispatch(addEducation(workExperience));
      //   });
      // }

    }
catch (error) {
      console.error("Error fetching CV data:", error);
    }
  }
  
  useEffect(() => {
    getUserId(); // זה יעדכן את מצב ה-userId
    foundIfCvFill(); // ��ה יקרא ל-foundIfCvFill כאשר המצב של הuserId משתנה
  }, []);
  
  useEffect(() => {
    // קרא ל-getMyCvForm רק כאשר userId זמין
    if (userId) {
      getMyCvForm();
    }
  }, [userId]); // הרץ מחדש כאשר userId משתנה
  

  

  function foundIfCvFill() {
    getMyCvForm();
    const isPersonalInformattionFill =
      cvForm.personalInformation.firstName !== "" ||
      cvForm.personalInformation.lastName !== "" ||
      cvForm.personalInformation.city !== "" ||
      cvForm.personalInformation.email !== "" ||
      cvForm.personalInformation.phoneNumber !== "";

    const hasOtherDetails =
      cvForm.educations.length > 0 ||
      cvForm.skills.length > 0 ||
      cvForm.professionalSummary.length > 0 ||
      cvForm.serviceType.length > 0 ||
      cvForm.workExperience.length > 0;

    setIsCvFill(isPersonalInformattionFill || hasOtherDetails);
  }

  return { isCvFill };
};
