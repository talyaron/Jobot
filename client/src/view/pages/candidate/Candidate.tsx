import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store"
import styles from "./candidate.module.scss";
import { Link, Outlet } from "react-router";
import CandidateLogin from "../CandidateLogin/CandidateLogin";
import { useCandidateVM } from "./candidateVM";

const Candidate = () => {
  const { showLogin, setShowLogin } = useCandidateVM()
  return (
    <div>
      {showLogin ? (
        <CandidateLogin closeLoginBtn={() => setShowLogin(false)} />
      ) : (
        <>
          <h1 className={styles.main}>Initialize Candidate</h1>
          <div className="btns">
            <Link to="my-jobs">
              <button>My Jobs</button>
            </Link>
            <Link to="/">
              <button>Find Jobs</button>
            </Link>
            <Link to="">
              <button>All Jobs</button>
            </Link>
          </div>
          <Outlet />
        </>
      )}
    </div>
  );
};

export default Candidate;
