import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Route, Routes } from 'react-router'

import Wizard from './view/pages/wizard/Wizard.tsx'
import Login from './view/pages/login/Login.tsx'
import Home from './view/pages/home/Home.tsx'
import JobCandidate from './view/pages/jobCandidate/JobCandidate.tsx'
import EmployerWrapper from './view/pages/employerWrapper/EmployerWrapper.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/wizard" element={<Wizard />} />
        <Route path="/job-candidate" element={<JobCandidate />} />
        <Route path="*" element={<div>Not Found</div>} />
        <Route path="employer" element={<EmployerWrapper />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
