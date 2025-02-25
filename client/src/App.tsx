import './App.css'
import Auth from './view/pages/auth/Auth'
import Candidate from './view/pages/candidate/Candidate'
import JobApplication from './view/pages/jobApplication/JobApplication'

function App() {

  if(JobApplication)
  return (<JobApplication></JobApplication>)


  return (
    

      <div>
        <h1>Jobot system</h1>
        <br />
        <Auth></Auth>
      </div>
  )
}

export default App
