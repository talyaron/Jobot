import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Job } from '../../models/jobs/jobsModel';


export interface JobsState {
  jobs: Job[];
}

const initialJobState: JobsState = {
  jobs: [],
}

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState: initialJobState,
  reducers: {
    setJob: (state, action: PayloadAction<Job>) => {
      state.jobs.push(action.payload);
    },
    clearJobs: (state) => {
      state.jobs = [];
    },
    updateJob: (state, action: PayloadAction<Job>) => {
      const index = state.jobs.findIndex(job => job.id === action.payload.id);
      if (index !== -1) {
        state.jobs[index] = action.payload;
      }
    },
    removeJob: (state, action: PayloadAction<string>) => {
      state.jobs = state.jobs.filter(job => job.id !== action.payload);
    },
  },
})

export const { setJob, clearJobs, updateJob, removeJob } = jobsSlice.actions

export default jobsSlice.reducer
