import React from 'react'
import PersonalInformation from './personalInformation/PersonalInformation'
import WorkExperience from './workExperience/WorkExperience'
import ProfessionalSummary from './professionalSummary/ProfessionalSummary'
import Skills from './skills/Skills.'
import Education from './education/Education'
import ServiceType from './serviceType/ServiceType'

const DesignCvWizard = () => {
  return (
    <div>
      <h1>אשף קורות חיים</h1>
      <PersonalInformation />
      <br />
      <ProfessionalSummary />
      <Education />
      <WorkExperience />
      <ServiceType />
      <Skills />
    </div>
  )
}

export default DesignCvWizard
