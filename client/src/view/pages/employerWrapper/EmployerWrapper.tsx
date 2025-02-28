import React from "react";
import { Outlet, Link } from "react-router-dom";

const EmployerWrapper: React.FC = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/employer">Jobs</Link></li>
          <li><Link to="/employer/candidates">Candidates</Link></li>
          <li><Link to="/employer/applications">Applications</Link></li>
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
