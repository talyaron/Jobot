import { BrowserRouter, useRoutes } from "react-router";
import "./App.css";
import Auth from "./view/pages/auth/Auth";
import routes from "./routes/routes";

function AppRoutes() {
  return useRoutes(routes);
}

function App() {
  return (
    <BrowserRouter>
      <div dir="rtl">
        <h1>Jobot System</h1>
        <AppRoutes />
        <br />
        <Auth />
      </div>
    </BrowserRouter>
  );
}

export default App;
