import './App.css'
import Auth from './view/pages/auth/Auth'
import Wizard from './view/pages/wizard/Wizard';
import { useState } from 'react';

function App() {
  const testUserId = "67b9edaa4e2f6b7890741ce1"; // Using a test user ID for now
const [showWizard, setShowWizard] = useState(false);

  return (

    <div dir="rtl">
         <h1>Jobot system</h1>

        <br />
      {showWizard && <Wizard closeButton={() => setShowWizard(false)} />}
      </div>
  )
}

export default App;
