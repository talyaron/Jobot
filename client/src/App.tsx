import { useSelector } from 'react-redux'
import './App.css'
import AddButton from './redux/counter/view/AddButton'
import DecreaseButton from './redux/counter/view/DecreaseButton'
import IncrementAmount from './redux/counter/view/IncrementAmount'
import Auth from './view/pages/auth/Auth'
import Candidate from './view/pages/candidate/Candidate'
import { RootState } from './redux/store'

function App() {

  const counter = useSelector((state:RootState)=>state.counter.value)

  return (
      <div>
        <h1>Jobot system</h1>
        <br />
        <Auth></Auth>
        <h1>{counter}</h1>
    <AddButton />
    <DecreaseButton />
    <IncrementAmount />
      </div>
  )
}

export default App
