import React, { useState } from 'react';
import { Link } from 'react-router';
import TextChanger from '../textChanger/TextChanger';
import styles from "./Home.module.scss";
import Wizard from '../wizard/Wizard';

const Home: React.FC = () => {

  const [openWizard, setOpenWizard] = useState(false);

  function handleOpenWizard() {
    setOpenWizard(true);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>ג'ובוט</h1>
      <TextChanger />
      <div className={styles.buttonGroup}>

        <button onClick={handleOpenWizard} className={styles.button}>העבודה המושלמת מחכה לך כאן</button>

        <Link to="/">
          <button className={styles.linkButton}>לכל המשרות</button>
        </Link>
      </div>
      <Wizard />
    </div>
  );
};

export default Home
