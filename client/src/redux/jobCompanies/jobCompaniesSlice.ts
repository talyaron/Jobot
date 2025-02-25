import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface JobCompaniesState {
  companyId: string;  
  jobId: string;     
}

interface JobCompaniesStateMap {
  [companyId: string]: JobCompaniesState[];
}

const initialState: JobCompaniesStateMap = {}

export const jobCompanySlice = createSlice({
  name: 'jobCompanies',
  initialState,
  reducers: {
    addJobCompanies: (state, action: PayloadAction<JobCompaniesState>) => {
      const { companyId } = action.payload;

      if (!state[companyId]) {
        state[companyId] = []
      }

      state[companyId].push(action.payload)
    },

    removeJobCompanies: (state, action: PayloadAction<JobCompaniesState>) => {
      const { companyId, jobId } = action.payload;

      if (state[companyId]) {
        state[companyId] = state[companyId].filter(
          (item) => item.jobId !== jobId
        );
      }
    },
  },
})

export const { addJobCompanies, removeJobCompanies } = jobCompanySlice.actions

export default jobCompanySlice.reducer
