import { useState } from "react";
import JobDetails from "../../components/jobDetails/JobDetails";
import { useJobCandidateVM } from "./JobCandidateVM";
import JobApply from "../../components/jobApply/JobApply";
import "./JobCandidate.nodule.scss";
import { MessageSquareText } from 'lucide-react';

import CandidateLogin from "../CandidateLogin/CandidateLogin";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/user/userSlice";
import { Link } from "react-router";

const JobCandidate = () => {

  const { job } = useJobCandidateVM();
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector(userSelector);

  const isLoggedIn = user._id !== "";


  return (
    //when press on job to show, it will pass jobId to fetchJob function
    //and then it will show the job details
    <div className="app-container">
      {job && <JobDetails job={job} />}
      {isLoggedIn ? (
        <>
          <button className="open-button" onClick={() => setIsOpen(true)}>
            Apply to job
          </button>
          <Link to={`/candidate/chat/${job?._id}`}>
            <MessageSquareText />
          </Link>
        </>
      ) : (
        <CandidateLogin />
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
