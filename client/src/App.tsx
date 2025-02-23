import "./App.css";
import Candidate from "./view/pages/candidate/Candidate";
import Results from "./view/pages/results/Results";

function App() {
  const testUserId = "67b9edaa4e2f6b7890741ce1"; // Using a test user ID for now

  return (
    <div>
      <h1>Jobot system</h1>
      <br />
      <Candidate />
      <Results userId={testUserId} />
    </div>
  );
}

export default App;
