import React, { useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router";
import EmployerWrapperVM from "./EmployerWrapperVM";

const EmployerWrapper: React.FC = () => {
  const {showLogin} =EmployerWrapperVM();
  const navigate = useNavigate(); // Initialize the navigate function

  // Use useEffect to navigate when showLogin is true
  useEffect(() => {
    if (showLogin) {
      navigate('/employer/login');
    }
  }, [showLogin, navigate]); 

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/employer">Jobs</Link></li>
          <li><Link to="/employer/candidates">Candidates</Link></li>
          <li><Link to="/employer/chat">Chat</Link></li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default EmployerWrapper;
