
import JobDetails from '../../components/jobDetails/JobDetails'
import { useJobCandidateVM } from './JobCandidateVM';


const JobCandidate = () => {
    
  const { job,fetchJob } = useJobCandidateVM();
  return (
    <div>
      {job && <JobDetails job={job} />}
      <button>Apply to job</button>
    </div>
  )
}

export default JobCandidate
