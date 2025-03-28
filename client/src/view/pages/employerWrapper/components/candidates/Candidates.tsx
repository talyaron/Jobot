import React from 'react'
import { useCandidates } from './CandidatesVM'
import { Link } from 'react-router'
import CandidateCard from '../../../../components/candidatesCard/CandidatesCard';
const Candidates = () => {
    const { candidates } = useCandidates();
    console.log(candidates)
    return (
      <div>
      <h2>Candidates</h2>
      {candidates.map(can => (
          <CandidateCard
          email={can.candidate.email}
          phone={can.candidate.phoneNumber}
          />
      ))}
  </div>
    )
}

export default Candidates