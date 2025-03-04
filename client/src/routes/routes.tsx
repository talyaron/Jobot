import { RouteObject } from "react-route";
import JobsEmployer from "../view/pages/jobsEmployer/JobsEmployer";
import JobApplication from "../view/pages/jobApplication/JobApplication";
import ApplicationStatus from "../view/pages/applicationstatus/ApplicationStatus";
import Chat from "../view/pages/chat/Chat";
import JobCandidatesSlice from "../redux/jobCandidates/jobCandidatesSlice";
import EmployerWrapper from "../view/pages/employerWrapper/EmployerWrapper";

const routes: RouteObject[] = [
  {
    path: "employer",
    element: <EmployerWrapper />,
    children: [
      { index: true, element: <JobsEmployer /> }, 
      { path: "candidates", element: <JobCandidatesSlice /> },
      { path: "applications", element: <JobApplication /> },
      { path: "applications/status", element: <ApplicationStatus /> },
      { path: "chat", element: <Chat /> },
    ],
  },
];

export default routes;
