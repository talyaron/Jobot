import { useState } from "react";
import { Link } from 'react-router'; 
import jobot from "../../../assets/jobot.svg"
import styles from "./topNav.module.scss";
import useTopNav from "./topNavVM";
import CandidateLogin from "../CandidateLogin/CandidateLogin";

const TopNav = () => {
    const {isRegistered} = useTopNav();
    const [openCandidateLogin, setOpenCandidateLogin] = useState<boolean>(false); 

    return (
        <div className={styles.main}>
            <div className={styles.navButtons}>
                { !isRegistered && <button onClick={() => setOpenCandidateLogin(true)}>התחברות</button>}
                { openCandidateLogin && <CandidateLogin/> }
                <Link to="/contact">צור קשר</Link>
                <Link to="/employer">מעסיקים</Link>
                <Link to="/about">מי אנחנו</Link>
                <Link to="/">בית</Link>
            </div>
            <img src={jobot} />
        </div>
    )
}

export default TopNav;