import { useSelector } from 'react-redux'
import './App.css'
import Auth from './view/pages/auth/Auth'
import { RootState } from './redux/store'

function App() {

  const counter = useSelector((state:RootState)=>state.counter.value)

  return (
      <div>
        <h1>Jobot system</h1>
        <br />
        <Auth></Auth>
      </div>
  )
}

export default App
