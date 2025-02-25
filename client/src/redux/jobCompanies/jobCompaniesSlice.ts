import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { JobCompany } from '../../models/jobCompany/jobCompanyModel';



interface JobCompaniesState {
  jobCompanies: JobCompany[];
}

const initialState: JobCompaniesState = {
  jobCompanies: [],
}

export const jobCompanySlice = createSlice({
  name: 'jobCompanies',
  initialState,
  reducers: {
    addJobCompany: (state, action: PayloadAction<JobCompany>) => {
      state.jobCompanies.push(action.payload)
    },

    removeJobCompany: (state, action: PayloadAction<JobCompany>) => {
      state.jobCompanies = state.jobCompanies.filter(
        (item) => item.companyId !== action.payload.companyId || item.jobId !== action.payload.jobId
      );
    },
  },
})

export const { addJobCompany, removeJobCompany } = jobCompanySlice.actions

export default jobCompanySlice.reducer
