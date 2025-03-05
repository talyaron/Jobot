
import { useNavigate } from 'react-router-dom';
import JobDetails from '../../components/jobDetails/JobDetails'
import { useJobCandidateVM } from './JobCandidateVM';


const JobCandidate = () => {

  const { job, fetchJob, user } = useJobCandidateVM();
  const navigate = useNavigate();

  const handleApplyToJob = () => {
    if (user) {
      navigate(`/job-application/${user}-${job}`)
    } else {
      navigate(`/login`)
    }

  }

  return (
    <div>
      {job && <JobDetails job={job} />}
      <button onClick={handleApplyToJob}>Apply to job</button>
    </div>
  )
}

export default JobCandidate
