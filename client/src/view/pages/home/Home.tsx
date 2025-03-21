import React, { useState } from 'react';
import { Link } from 'react-router'; 
import TextChanger from '../textChanger/TextChanger';
import styles from "./Home.module.scss";
import Wizard from '../wizard/Wizard';
import JobApplication from '../jobApplication/JobApplication';
import TopNav from '../../components/topNav/topNav';

const Home: React.FC = () => {
  const [openWizard, setOpenWizard] = useState(false);

  function handleOpenWizard() {
    setOpenWizard(true);
  }

  return (
    <div className={styles.container}>
      <TopNav/>
      <JobApplication></JobApplication>
        
      <h1 className={styles.header}>ג'ובוט</h1>
      <TextChanger />

      <div className={styles.buttonGroup}>
        <button onClick={handleOpenWizard} className={styles.button}>העבודה המושלמת מחכה לך כאן</button>

        <Link to="/candidate">
          <button className={styles.linkButton}>לכל המשרות</button>
        </Link>
      </div>

      {openWizard && <Wizard closeButton={() => setOpenWizard(false)} />}
    </div>
  );
};

export default Home;
