import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './view/pages/auth/Auth'
import Candidate from './view/pages/candidate/Candidate'
import FirstPage from './view/pages/firstPage/FirstPage'
import Wizard from './view/pages/wizard/Wizard'

function App() {


  return (
    <div dir="rtl">
         <h1>Jobot system</h1>
        <br />
        <Auth />
      </div>
  )
}

export default App
