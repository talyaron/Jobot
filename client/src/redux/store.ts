import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./user/userSlice"
import companiesReducer from "./companies/companiesSlice"
import jobsReducer from "./jobs/jobsSlice"
import jobCompaniesReducer from "./jobCompanies/jobCompaniesSlice"
import jobCandidatesReducer from "./jobCandidates/jobCandidatesSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    companies: companiesReducer,
    jobCompanies: jobCompaniesReducer,
    jobCandidates: jobCandidatesReducer,
    jobs: jobsReducer,

  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
