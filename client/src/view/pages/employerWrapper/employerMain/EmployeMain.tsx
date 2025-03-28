import React from 'react'
import JobsEmployer from '../../jobsEmployer/JobsEmployer'
import Candidates from '../components/candidates/Candidates'

const EmployerMain = () => {
  return (
    <div>
        <Candidates />
        <JobsEmployer />
    </div>
  )
}

export default EmployerMain