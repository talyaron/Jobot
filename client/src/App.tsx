import './App.css'
import Candidate from './view/pages/candidate/Candidate'
import JobCandidate from './view/pages/jobCandidate/JobCandidate'

function App() {
  const testUserId = "67b9edaa4e2f6b7890741ce1"; // Using a test user ID for now
const [showWizard, setShowWizard] = useState(false);

  return (

    <div dir="rtl">
         <h1>Jobot system</h1>

        <br />
        <JobCandidate />
      </div>
  )
}

export default App;
