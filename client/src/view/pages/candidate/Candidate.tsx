import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store"
import styles from "./candidate.module.scss";
import { Outlet } from "react-router";
import CandidateLogin from "../CandidateLogin/CandidateLogin";
import { useCandidateVM } from "./candidateVM";

const Candidate = () => {
  const {showLogin, setShowLogin} = useCandidateVM()
  return (
    <div>
      {showLogin ? (
        <CandidateLogin closeLoginBtn={() => setShowLogin(false)} />
      ) : (
        <>
          <h1 className={styles.main}>Initialize Candidate</h1>
          <Outlet />
        </>
      )}
    </div>
  );
};

export default Candidate;
