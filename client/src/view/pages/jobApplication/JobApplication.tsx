import JobDetails from '../../components/jobDetails/JobDetails'
import JobApplicationVM from './JobApplicationVM'
import styles from "./JobApplication.module.scss"
import JobInputBox from '../../components/jobInput/JobInputBox'

const JobApplication = () => {
  const { job ,user} = JobApplicationVM()
  if(!job)return;

  return (
    <div>
    <div className={styles.JobDetailsWrapper}>
      <JobDetails job={job} key={crypto.randomUUID()} />
    </div>
    <JobInputBox job={job} user={user}></JobInputBox>
    </div>
  )
}

export default JobApplication
