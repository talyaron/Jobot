import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../redux/store";
// import { fetchCvForm } from "../../../../redux/cv/cvSlice"; // ייבוא הפעולה
import { updatePersonalInformation } from "../../../../redux/cv/cvSlice"

export const useAllComponentsVM = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isCvFill, setIsCvFill] = useState(false);
  const cvForm = useSelector((state: RootState) => state.cvForm);
  var userId = "";

  async function getUserId(){
    try{
    const response = await fetch(`http://localhost:3000/api/user/profile`,{
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch user");
    const data = await response.json();
    userId = data._id;
    console.log(data)
  }
  catch(error){
    console.error("Error fetching user data:", error);
  }
}

  async function getMyCvForm() {
    if (!userId) return; // מוודא שהמשתמש אכן קיים לפני הקריאה לשרת
    try {
      const response = await fetch(`http://localhost:3000/api/cv/getCvForm/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch user");
      const data = await response.json();
      console.log(data);
      dispatch(updatePersonalInformation(data.personalInformation));
    } catch (error) {
      console.error("Error fetching CV data:", error);
    }
  }
  
  useEffect(() => {
    async function fetchData() {
      await getUserId(); // מוודא שהמשתמש נטען
      getMyCvForm(); // מבצע את קריאת ה-CV רק לאחר קבלת ה-userId
    }
    fetchData();
    foundIfCvFill();
  }, []);
  
  

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
