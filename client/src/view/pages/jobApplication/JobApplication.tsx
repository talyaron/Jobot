import JobDetails from '../../components/jobDetails/JobDetails'
import JobApplicationVM from './JobApplicationVM'
import styles from "./JobApplication.module.scss"
import JobInputBox from '../../components/jobInput/JobInputBox'

const JobApplication = () => {
  const { application, error, loading} = JobApplicationVM()
  if(loading)return <h1>Loading...</h1>;

  return (
    <div>
    <div className={styles.JobDetailsWrapper}>
     {application && <p>{application.candidate.email}</p>}
    </div>
    {/* <JobInputBox job={job} user={user}></JobInputBox> */}
    </div>
  )
}

export default JobApplication
