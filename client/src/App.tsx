import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './view/pages/auth/Auth'
import Candidate from './view/pages/candidate/Candidate'

function App() {


  return (
      <div>
        <h1>Jobot system</h1>
        <br />
        <Auth></Auth>
      </div>
  )
}

export default App
