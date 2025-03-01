import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Route, Routes } from 'react-router'

import Login from './view/pages/login/Login.tsx'
import Home from './view/pages/home/Home.tsx'
import JobCandidate from './view/pages/jobCandidate/JobCandidate.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/job-candidate" element={<JobCandidate />} />
          <Route path="employer" element={<EmployerWrapper />}>
            <Route index element={<JobsEmployer />} />
            <Route path="candidates" element={<JobCandidate/>} />
            <Route path="applications" element={<JobApplication />} />
            <Route path="applications/status" element={<ApplicationStatus />} />
            <Route path="chat" element={<Chat />} />
          </Route>
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
     
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
