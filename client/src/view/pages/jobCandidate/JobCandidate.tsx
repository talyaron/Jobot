
import JobDetails from '../../components/jobDetails/JobDetails'
import { Job, useJobCandidateVM } from './JobCandidateVM';

const JobCandidate = () => {
    
  const { job } = useJobCandidateVM();
  return (
    <div>
      {job && <JobDetails job={job} />}
      <button>Apply to job</button>
    </div>
  )
}

export default JobCandidate
