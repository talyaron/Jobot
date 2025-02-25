import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface JobCandidateState {
  candidateId: string;
  jobId: string; 
}

const initialState: JobCandidateState[] = []

export const jobCandidateSlice = createSlice({
  name: 'jobCandidate',
  initialState,
  reducers: {
    addJobCandidate: (state, action: PayloadAction<JobCandidateState>) => {
      state.push(action.payload)
    },
    removeJobCandidate: (state, action: PayloadAction<JobCandidateState>) => {
      return state.filter(
        (item) => item.candidateId !== action.payload.candidateId || item.jobId !== action.payload.jobId
      )
    },
  },
})

export const { addJobCandidate, removeJobCandidate } = jobCandidateSlice.actions

export default jobCandidateSlice.reducer
