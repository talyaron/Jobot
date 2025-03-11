
import styles from "./candidate.module.scss";
import { Link, Outlet } from "react-router";
import CandidateLogin from "../CandidateLogin/CandidateLogin";
import { useCandidateVM } from "./candidateVM";

const Candidate = () => {
 
  const { isLoggedIn } = useCandidateVM();
 
  
  return (
    <div>
      {!isLoggedIn ? (
        <CandidateLogin />
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
          <form>
            <input type="date" name="" id="" />
            <input type="text" name="" id="" />
            <input type="text" name="" id="" />
            <button>ADD</button>
            <div className="btn">Hi</div>
          </form>
          <Outlet />
        </>
      )}
    </div>
  );
};

export default Candidate;
