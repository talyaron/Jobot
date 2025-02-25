import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Candidate from './view/pages/candidate/Candidate'
import DesignCvWizard from './view/pages/designCvWizard/DesignCvWizard'

function App() {


  return (
      <div>
        <h1>Jobot system</h1>
        <br />
        <DesignCvWizard />
      </div>
  )
}

export default App
