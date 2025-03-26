import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import AllComponents from "./allComponents/AllComponents";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getEducationFromServer, getServiceTypesFromServer, getSkillsFromServer, getWorkExperienceFromServer, updatePersonalInformation, updateProfessionalSummary } from "../../../redux/cv/cvSlice";

const DesignCvWizard = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(""); // שמור userId במצב

    useEffect(() => {    
            getUserId();
});

  async function getUserId(){
    const response = await fetch(`http://localhost:3000/api/user/profile`,{
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch user");
    const data = await response.json();
    const userId = data._id;
    setUserId(userId); // עדכ�� את משתנה המצב
    console.log("data from desgin cv wizard " , data)
    dispatch(updatePersonalInformation({userId}))
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
          console.log("Skills from server:", data.skills); // לבדוק שהנתונים מגיעים
          dispatch(getSkillsFromServer(data.skills)); // לשלוח את כל המערך במקום לרוץ ב-loop
      }
  
      if (data.educations){
        dispatch(getEducationFromServer(data.educations));
      }
      if (data.workExperience){
        dispatch(getWorkExperienceFromServer(data.workExperience));
      }
      if (data.serviceType){
        dispatch(getServiceTypesFromServer(data.serviceType));
      }
    }
  catch (error) {
        console.error("Error fetching CV data:", error);
      }
    }
    
    useEffect(() => {
      getUserId(); // זה יעדכן את מצב ה-userId
      // foundIfCvFill(); // ��ה יקרא ל-foundIfCvFill כאשר המצב של הuserId משתנה
    }, []);
    
    useEffect(() => {
      // קרא ל-getMyCvForm רק כאשר userId זמין
      if (userId) {
        getMyCvForm();
      }
    }, [userId]); // הרץ מחדש כאשר userId משתנה

  return (
    <Provider store={store}>
      <AllComponents /> 
    </Provider>
  );
};

export default DesignCvWizard;
