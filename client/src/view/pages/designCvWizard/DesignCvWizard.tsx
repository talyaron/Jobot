import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import AllComponents from "./allComponents/AllComponents";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getEducationFromServer, getServiceTypesFromServer, getSkillsFromServer, getWorkExperienceFromServer, updatePersonalInformation, updateProfessionalSummary } from "../../../redux/cv/cvSlice";

const DesignCvWizard = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(""); // save the user id

  async function getUserId(){
    const response = await fetch(`http://localhost:3000/api/user/profile`,{
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch user");
    const data = await response.json();
    const userId = data._id;
    setUserId(userId); // change to the new id
    dispatch(updatePersonalInformation({userId}))
  }

    async function getMyCvForm() {
      if (!userId) return;
      try {
        const response = await fetch(`http://localhost:3000/api/cv/getCvForm/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user");
        const data = await response.json();        
      
        if (data.personalInformation) {
          // If it's an array, take the first item
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
          dispatch(getSkillsFromServer(data.skills)); 
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
      getUserId();
    }, []);
    
    useEffect(() => {
      // get only if there a user id
      if (userId) {
        getMyCvForm();
      }
    }, [userId]); // render again if userId changed

  return (
    <Provider store={store}>
      <AllComponents /> 
    </Provider>
  );
};

export default DesignCvWizard;
