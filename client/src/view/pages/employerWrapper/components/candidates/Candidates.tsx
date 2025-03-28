import React from 'react'
import { useCandidates } from './CandidatesVM'

const Candidates = () => {
    const {candidates} = useCandidates()
  return (
    <div>Candidates</div>
  )
}

export default Candidates