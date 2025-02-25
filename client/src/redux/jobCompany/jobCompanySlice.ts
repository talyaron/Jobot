import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface JobCompanyState {
  companyId: string;
  jobId: string;
}

const initialState: JobCompanyState[] = []

export const jobCompanySlice = createSlice({
  name: 'jobCompany',
  initialState,
  reducers: {
    addJobCompany: (state, action: PayloadAction<JobCompanyState>) => {
      state.push(action.payload)
    },
    removeJobCompany: (state, action: PayloadAction<JobCompanyState>) => {
      return state.filter(
        (item) => item.companyId !== action.payload.companyId || item.jobId !== action.payload.jobId
      )
    },
  },
})

export const { addJobCompany, removeJobCompany } = jobCompanySlice.actions

export default jobCompanySlice.reducer
