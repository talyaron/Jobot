import React, { useState } from 'react';
import { Link } from 'react-router'; 
import TextChanger from '../textChanger/TextChanger';
import styles from "./Home.module.scss";
import Wizard from '../wizard/Wizard';
import CandidateLogin from '../CandidateLogin/CandidateLogin';
import JobApplication from '../jobApplication/JobApplication';
import NavHeader from '../../components/navHeader/NavHeader';
//import logo from '../../../assets/images/logo.png';
import homeImg from '../../../assets/images/homeImg.png';


const Home: React.FC = () => {
  const [openWizard, setOpenWizard] = useState(false);
  const [openCandidateLogin, setOpenCandidateLogin] = useState(false); 

  function handleOpenWizard() {
    setOpenWizard(true);
  }

  function handleOpenCandidateLogin() {
    setOpenCandidateLogin(true); 
  }

  return (
    <div className={styles.container}>
      <NavHeader></NavHeader>
      <JobApplication></JobApplication>
      <button onClick={handleOpenCandidateLogin} className={styles.LoginButton}>התחברות</button>
      {openCandidateLogin && <CandidateLogin closeLoginBtn={() => setOpenCandidateLogin(false)} />} 

      <div className={styles.wizard} >
      <h1 className={styles.header}>ג'ובוט</h1>
      <TextChanger />
  
      <div className={styles.buttonGroup}>
        <button onClick={handleOpenWizard} className={styles.button}>העבודה המושלמת מחכה לך כאן</button>
        <img src={homeImg} alt="home image" />
        <Link to="/candidate">
          <button className={styles.linkButton}>לכל המשרות</button>
        </Link>
      </div>
      </div>
      {openWizard && <Wizard closeButton={() => setOpenWizard(false)} />}
    </div>
  );
};

export default Home;
