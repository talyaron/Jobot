import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface JobsState {
  jobs: { 
    id: string;
    name: string;
    salary: number;
    requirements: string[];
  }[];
}

const initialJobState: JobsState = {
  jobs: [],
}

export const jobsSlice = createSlice({
  name: 'job',
  initialState: initialJobState,
  reducers: {
    setJob: (state, action: PayloadAction<{ id: string; name: string; salary: number; requirements: string[] }>) => {
      state.jobs.push(action.payload);
    },
    clearJob: (state) => {
      state.jobs = [];
    },
  },
})

export const { setJob, clearJob } = jobsSlice.actions

export default jobsSlice.reducer
