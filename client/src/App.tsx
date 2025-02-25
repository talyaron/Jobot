import './App.css'
import Auth from './view/pages/auth/Auth'

function App() {
  const testUserId = "67b9edaa4e2f6b7890741ce1"; // Using a test user ID for now

  return (
      <div>
        <h1>Jobot system</h1>
        <br />
        <Auth></Auth>
      </div>
  )
}

export default App;
