import styles from './JobEmployer.module.scss';
import JobDetails from '../../components/jobDetails/JobDetails';
import useJobEmployer from './JobEmployerVM';
import { useState } from 'react';
import { User } from '../../../model/userModel';
import CandidateEmployer from '../candidateEmployer/CandidateEmployer';

interface Candidate {
    userId: User;
    messageToEmployer: string;
    _id: string;
}

const JobEmployer = ({ jobId }: { jobId: string }) => {
    const { candidates, job } = useJobEmployer(jobId);
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

    return (
        <div className={styles["job-employer"]}>
            {job && <JobDetails job={job} />}
            {candidates.length > 0 ? candidates.map(candidate => (
                <h3 key={candidate.userId._id} onClick={() => setSelectedCandidate(candidate)}>
                    {candidate.userId.fullName}
                </h3>
            )) : <h3>No candidates found for this job.</h3>}

            {selectedCandidate && (
                <div className={styles.popup}>
                    <div className={styles.popupContent}>
                        <button className={styles.closeBtn} onClick={() => setSelectedCandidate(null)}>X</button>
                        <CandidateEmployer user={selectedCandidate.userId} message={selectedCandidate.messageToEmployer} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobEmployer;
