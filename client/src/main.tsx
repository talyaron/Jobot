import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router"; 
import "./view/styles/style.scss";


import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import EmployerWrapper from './view/pages/employerWrapper/EmployerWrapper.tsx'
import JobsEmployer from './view/pages/jobsEmployer/JobsEmployer.tsx'
import JobApplication from './view/pages/jobApplication/JobApplication.tsx'
import ApplicationStatus from './view/pages/applicationstatus/ApplicationStatus.tsx'
import Chat from './view/pages/chat/Chat.tsx'
import Candidate from './view/pages/candidate/Candidate.tsx'
import Home from "./view/pages/home/Home.tsx";
import Login from "./view/pages/login/Login.tsx";
import JobCandidate from "./view/pages/jobCandidate/JobCandidate.tsx";
import Results from "./view/pages/results/Results.tsx";
import { MyJobs } from "./view/pages/myJobs/MyJobs.tsx";
import EmployerLogin from "./view/pages/employerLogin/EmployerLogin.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route path="/candidate" element={<Candidate />}>
            <Route index element={<Results />} />
            <Route path="job-candidate/:jobId" element={<JobCandidate />} />
            <Route path=":userId" element={<Results />} />
            <Route path="job-application/:user-jobId" element={<JobApplication />} />
          </Route>
          <Route path="employer" element={<EmployerWrapper />}>
            <Route index element={<JobsEmployer />} />
            <Route path="login" element={<EmployerLogin/>} />
            <Route path="candidates" element={<JobCandidate/>} />
            <Route path="applications" element={<JobApplication />} />
            <Route path="applications/status" element={<ApplicationStatus />} />
            <Route path="chat" element={<Chat />} />
          </Route>
          <Route path="/myjobs" element={<MyJobs />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>

      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
