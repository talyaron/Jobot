import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { JobCandidateState } from '../../models/jobCandidates/jobCandidatesModel';

interface JobCandidatesState {
  jobCandidates: JobCandidateState[];
}

const initialState: JobCandidatesState = {
  jobCandidates: [],
}

export const jobCandidateSlice = createSlice({
  name: 'jobCandidates',
  initialState,
  reducers: {
    addJobCandidate: (state, action: PayloadAction<JobCandidateState>) => {
      state.jobCandidates.push(action.payload)
    },

    removeJobCandidate: (state, action: PayloadAction<JobCandidateState>) => {
      state.jobCandidates = state.jobCandidates.filter(
        (item) => item.candidateId !== action.payload.candidateId || item.jobId !== action.payload.jobId
      );
    },
  },
})

export const { addJobCandidate, removeJobCandidate } = jobCandidateSlice.actions

export default jobCandidateSlice.reducer
