import React from 'react'
import { useCandidates } from './CandidatesVM'
import { Link } from 'react-router'

const Candidates = () => {
    const { candidates } = useCandidates();
    console.log(candidates)
    return (
        <div>
            <h2>Candidates</h2>
            <ul>
                {candidates?.map((candidate:any) => (
                    <Link to={`application/${candidate.applicationId}`} key={candidate.applicationId}><li >{candidate.candidate.email}</li></Link>
                ))}
            </ul>
        </div>
    )
}

export default Candidates