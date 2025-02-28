import React, { useState } from 'react';
import { Link } from 'react-router';
import TextChanger from '../textChanger/TextChanger';
import styles from './FirstPage.module.scss';
import Wizard from '../wizard/Wizard';

const FirstPage: React.FC = () => {

  const [showWizard, setShowWizard] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>ג'ובוט</h1>
      <TextChanger />
      <div className={styles.buttonGroup}>
        <button
          className={styles.button}
          onClick={() => setShowWizard(true)}>העבודה המושלמת מחכה לך כאן</button>
        {showWizard ? <Wizard closeButton={() => setShowWizard(false)} /> : null}
        <Link to="/">
          <button className={styles.linkButton}>לכל .המשרות</button>
        </Link>
      </div>
    </div>
  );
};

export default FirstPage;
