import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FirstPage from './view/pages/firstPage/FirstPage.tsx'
import Wizard from './view/pages/wizard/Wizard.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <App />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/wizard" element={<Wizard />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
