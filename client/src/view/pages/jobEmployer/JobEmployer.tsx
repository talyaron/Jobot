import styles from './JobEmployer.module.scss'
import { Job } from "../../../model/jobModel"
import JobDetails from '../../components/jobDetails/JobDetails'
import useJobEmployer from './JobEmployerVM'
import { useState } from 'react'
import { User } from '../../../model/userModel'
import CandidateEmployer from '../candidateEmployer/CandidateEmployer'

const JobEmployer = ({ job }: { job: Job }) => {
    const { candidates } = useJobEmployer(job);
    const [selectedCandidate, setSelectedCandidate] = useState<User | null>(null);

    return (
        <div className={styles["job-employer"]}>
            <JobDetails job={job}/>
            {candidates.map(candidate => (
                <h3 key={candidate._id} onClick={() => setSelectedCandidate(candidate)}>
                    {candidate.fullName}
                </h3>
            ))}
            
            {selectedCandidate && (
                <div className={styles.popup}>
                    <div className={styles.popupContent}>
                        <button className={styles.closeBtn} onClick={() => setSelectedCandidate(null)}>X</button>
                        <CandidateEmployer user={selectedCandidate} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default JobEmployer
