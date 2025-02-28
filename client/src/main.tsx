import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './view/pages/login/Login.tsx'
import Home from './view/pages/home/Home.tsx'
import JobCandidate from './view/pages/jobCandidate/JobCandidate.tsx'
import JobEmployer from './view/pages/jobEmployer/JobEmployer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/job-candidate" element={<JobCandidate />} />
        <Route path="*" element={<div>Not Found</div>} />
        <Route path="/job-employer" element={<JobEmployer jobId={"67c186bb3696a02a49bb0def"}/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
