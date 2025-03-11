import { use, useEffect, useState } from "react";
import JobDetails from "../../components/jobDetails/JobDetails";
import { useJobCandidateVM } from "./JobCandidateVM";
import JobApply from "../../components/jobApply/JobApply";
import "./JobCandidate.nodule.scss";
import { useJobApplyVM } from "../../components/jobApply/JobApplyVM";
import CandidateLogin from "../CandidateLogin/CandidateLogin";

const JobCandidate = () => {

  const { job } = useJobCandidateVM();
  const [isOpen, setIsOpen] = useState(false);
  const { checkIfLoggedIn } = useJobApplyVM();
  const [showLogIn, setShowLogIn] = useState(true);
  const[isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    checkIfLoggedIn().then((isLoggedIn) => {
      setIsLoggedIn(isLoggedIn);
    });
  }, []);

  return (
    //when press on job to show, it will pass jobId to fetchJob function
    //and then it will show the job details
    <div className="app-container">
      {job && <JobDetails job={job} />}
      {isLoggedIn ? (
        <button className="open-button" onClick={() => setIsOpen(true)}>
          Apply to job
        </button>
      ) : (
        showLogIn && <CandidateLogin
          closeLoginBtn={()=>setShowLogIn(false)}
        /> 
      )}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <JobApply onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default JobCandidate;
