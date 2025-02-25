import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./counter/counterSlice"
import userReducer from "./user/userSlice"
import companyReducer from "./company/companySlice"
import jobReducer from "./job/jobSlice"
import jobCompanyReducer from "./jobCompany/jobCompanySlice"
import jobCandidateReducer from "./jobCandidate/jobCandidateSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    company: companyReducer,
    jobCompany: jobCompanyReducer,
    jobCandidate: jobCandidateReducer,
    job: jobReducer,

  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
