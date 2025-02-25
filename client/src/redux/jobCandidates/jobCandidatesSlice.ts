import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface JobCandidateState {
  candidateId: string;
  jobId: string;
}

interface JobCandidatesState {
  [jobId: string]: JobCandidateState[];
}

const initialState: JobCandidatesState = {} 

export const jobCandidateSlice = createSlice({
  name: 'jobCandidates',
  initialState,
  reducers: {
    addJobCandidate: (state, action: PayloadAction<JobCandidateState>) => {
      const { jobId } = action.payload;

      if (!state[jobId]) {
        state[jobId] = []; 
      }

      state[jobId].push(action.payload); 
    },
    removeJobCandidate: (state, action: PayloadAction<JobCandidateState>) => {
      const { jobId, candidateId } = action.payload;

      if (state[jobId]) {
        state[jobId] = state[jobId].filter(
          (item) => item.candidateId !== candidateId
        );
      }
    },
  },
})

export const { addJobCandidate, removeJobCandidate } = jobCandidateSlice.actions

export default jobCandidateSlice.reducer
