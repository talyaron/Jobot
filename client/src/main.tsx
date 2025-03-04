import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Исправлен импорт
import "./index.css";

// import Wizard from "./view/pages/wizard/Wizard.tsx";
import Login from "./view/pages/login/Login.tsx";
import Home from "./view/pages/home/Home.tsx";
import JobCandidate from "./view/pages/jobCandidate/JobCandidate.tsx";
import { MyJobs }  from "./view/pages/myJobs/MyJobs.tsx"; 
import Results from "./view/pages/results/Results.tsx";

import Login from './view/pages/login/Login.tsx'
import Home from './view/pages/home/Home.tsx'
import JobCandidate from './view/pages/jobCandidate/JobCandidate.tsx'

import EmployerWrapper from './view/pages/employerWrapper/EmployerWrapper.tsx'
import JobsEmployer from './view/pages/jobsEmployer/JobsEmployer.tsx'
import Chat from './view/pages/chat/Chat.tsx'
import JobEmployer from './view/pages/jobEmployer/JobEmployer.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import Candidate from './view/pages/candidate/Candidate.tsx'
import Results from './view/pages/results/Results.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/job-candidate" element={<JobCandidate />} />
          <Route path="candidate" element={<Candidate />}>
            <Route index element={<Results />} />
            <Route path=":userId" element={<Results />} />
          </Route>
          <Route path="employer" element={<EmployerWrapper />}>
            <Route index element={<JobsEmployer />} />
            <Route path="candidates" element={<JobEmployer jobId={"67c186bb3696a02a49bb0def"} />} />
            <Route path="chat" element={<Chat />} />
          </Route>
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>

      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
