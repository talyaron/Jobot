// import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './view/pages/auth/Auth'
import { Provider } from "react-redux"
import { store, RootState } from "./redux/store"
import { useSelector, useDispatch } from "react-redux";
function App() {
  const testUserId = "67b9edaa4e2f6b7890741ce1"; // Using a test user ID for now
  const cvForm = useSelector((state: RootState) => state.cvForm);

  return (
<Provider store={store}>
    <div dir="rtl">
         <h1>Jobot system</h1>

        <br />
        <Auth />
        <p>{cvForm.personalInformation.firstName}</p>
      </div>
      </Provider>
  )
}

export default App;
