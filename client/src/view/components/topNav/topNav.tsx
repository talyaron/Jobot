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
            <img src={jobot} />
            <div className={styles.navButtons}>
                <Link to="/">בית</Link>
                <Link to="/about">מי אנחנו</Link>
                <Link to="/maasik">מעסיקים</Link>
                <Link to="/contact">צור קשר</Link>
                { !isRegistered && <button onClick={() => setOpenCandidateLogin(true)}>התחברות</button>}
                { openCandidateLogin && <CandidateLogin/> }
            </div>
        </div>
    )
}

export default TopNav;