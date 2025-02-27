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
  const cvForm = useSelector((state: RootState) => state.cvForm); // ✅ עכשיו Redux עובד בלי תקיעות!

  return (
    <div>
      <h1>אשף קורות חיים</h1>
      <PersonalInformation />
      <ProfessionalSummary />
      <Education />
      <WorkExperience />
      <ServiceType />
      <Skills />
      <br />
      <button>שלח קורות חיים</button>
      <p>{cvForm.personalInformation?.firstName}</p>
      <p>{cvForm.personalInformation?.lastName}</p>
      <p>{cvForm.professionalSummary.summary}</p>
      <div>{cvForm.skills.map((x) => (
        <div key={x}>
          <p>{x.spokenLanguages}</p>
          <p>{x.technicalSkills}</p>
        </div>))}
      </div>
    </div>
  );
};

export default AllComponents;
