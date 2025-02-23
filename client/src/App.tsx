import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Candidate from './view/pages/candidate/Candidate'
import FirstPage from './view/pages/firstPage/FirstPage'
import Wizard from './view/pages/wizard/Wizard'

function App() {


  return (
    <div dir="rtl">
        {/* <h1>Jobot system</h1>
        <br />
        <Candidate /> */}
        {/* <Wizard /> */}
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/wizard" element={<Wizard />} />
      </Routes>
    </BrowserRouter>
      </div>
  )
}

export default App
