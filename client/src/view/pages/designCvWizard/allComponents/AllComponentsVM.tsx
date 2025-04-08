import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../redux/store";
import { getEducationFromServer, getServiceTypesFromServer, getSkillsFromServer, getWorkExperienceFromServer, updatePersonalInformation, updateProfessionalSummary } from "../../../../redux/cv/cvSlice"


export const useAllComponentsVM = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isCvFill, setIsCvFill] = useState(false);
  const [userId, setUserId] = useState(""); // save user id
  const cvForm = useSelector((state: RootState) => state.cvForm);

  async function getUserId() {
    try {
      const response = await fetch(`http://localhost:3000/api/user/profile`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch user");
      const data = await response.json();
      setUserId(data._id);
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
    foundIfCvFill(); // for the button changed
  }, []);
  
  useEffect(() => {
    // call only if user id changed
    if (userId) {
      getMyCvForm();
    }
  }, [userId]); 
  

  

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
