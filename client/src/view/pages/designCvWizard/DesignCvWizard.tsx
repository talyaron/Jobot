import React from 'react'
import { useSelector } from 'react-redux'
import PersonalInformation from './personalInformation/PersonalInformation'
import WorkExperience from './workExperience/WorkExperience'
import ProfessionalSummary from './professionalSummary/ProfessionalSummary'
import Skills from './skills/Skills'
import Education from './education//Education'
import ServiceType from './serviceType/ServiceType'
import { Provider } from "react-redux"
import { store, RootState } from "../../../redux/store"
const DesignCvWizard = () => {

  return (
    <Provider store={store}>
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
    </Provider>
  )
}

export default DesignCvWizard
