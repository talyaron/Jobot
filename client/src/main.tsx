import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Исправлен импорт
import "./index.css";

// import Wizard from "./view/pages/wizard/Wizard.tsx";
import Login from "./view/pages/login/Login.tsx";
import Home from "./view/pages/home/Home.tsx";
import JobCandidate from "./view/pages/jobCandidate/JobCandidate.tsx";
import { MyJobs }  from "./view/pages/myJobs/MyJobs.tsx"; // Добавляем импорт MyJobs

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/wizard" element={<Wizard />} /> */}
        <Route path="/job-candidate" element={<JobCandidate />} />
        <Route path="/myjobs" element={<MyJobs />} /> {/* Добавляем роут */}
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
