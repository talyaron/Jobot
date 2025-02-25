import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface JobState {
  id: string;
  name: string;
  salary: number;
  requirements: string[];
}

const initialJobState: JobState = {
  id: '',
  name: '',
  salary: 0,
  requirements: [],
}

export const jobSlice = createSlice({
  name: 'job',
  initialState: initialJobState,
  reducers: {
    setJob: (state, action: PayloadAction<JobState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.salary = action.payload.salary;
      state.requirements = action.payload.requirements;
    },
    clearJob: (state) => {
      state.id = '';
      state.name = '';
      state.salary = 0;
      state.requirements = [];
    },
  },
})

export const { setJob, clearJob } = jobSlice.actions

export default jobSlice.reducer
