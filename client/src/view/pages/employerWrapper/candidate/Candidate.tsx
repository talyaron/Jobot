import React from 'react'
import { useParams } from 'react-router'

const Candidate = () => {
    const {candidateId} = useParams()
  console.log(candidateId)
  return (
    <div>{candidateId}</div>
  )
}

export default Candidate