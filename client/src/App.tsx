import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Candidate from './view/pages/candidate/Candidate'

function App() {


  return (
      <div>
        <h1>Jobot system</h1>
        <br />
        <Candidate />
      </div>
  )
}

export default App
