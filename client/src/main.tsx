import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Route, Routes } from 'react-router'

import Wizard from './view/pages/wizard/Wizard.tsx'
import Login from './view/pages/login/Login.tsx'
import Home from './view/pages/home/Home.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/wizard" element={<Wizard />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
