import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import PersonalInformation from "../personalInformation/PersonalInformation";
import WorkExperience from "../workExperience/WorkExperience";
import ProfessionalSummary from "../professionalSummary/ProfessionalSummary";
import Skills from "../skills/Skills";
import Education from "../education/Education";
import ServiceType from "../serviceType/ServiceType";

const AllComponents = () => {
  const cvForm = useSelector((state: RootState) => state.cvForm); 

  const sendCvFormToServer = async () => { // 🔹 פונקציה אסינכרונית תקינה
    try {
      console.log("before send to the dada bate" , cvForm);
      const response = await fetch("http://localhost:3000/api/cv/updateCvForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cvForm),
      });

      if (response.ok) {
        alert("קורות החיים נשלחו בהצלחה!");
      } else {
        alert("שגיאה בשליחה");
      }
    } catch (error) {
      console.error("שגיאה:", error);
    }
  };


  return (
    <div>
      <h1>אשף קורות חיים</h1>
      <p>אתה שולח קורות חיים לעבודה</p>
      <p>{cvForm.personalInformation.jobName}</p>
      <PersonalInformation />
      <ProfessionalSummary />
      <Education />
      <WorkExperience />
      <ServiceType />
      <Skills />
      <br />
      <button onClick={sendCvFormToServer}>שלח קורות חיים</button>
      <p>user id from ctypto is: {cvForm.personalInformation.userId}</p>
      <p>{cvForm.personalInformation?.firstName}</p>
      <p>{cvForm.personalInformation?.lastName}</p>
      <div>
        {cvForm.skills.map((x, index) => (
          <div key={index}>
            <p>{x.spokenLanguages}</p>
            <p>{x.technicalSkills}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllComponents;
