import React from 'react';
import { Link } from 'react-router';
import TextChanger from '../textChanger/TextChanger';
import styles from './FirstPage.module.scss';

const FirstPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>ג'ובוט</h1>
      <TextChanger />
      <div className={styles.buttonGroup}>
        <Link to="/wizard">
          <button className={styles.button}>העבודה המושלמת מחכה לך כאן</button>
        </Link>
        <Link to="/">
          <button className={styles.linkButton}>לכל המשרות</button>
        </Link>
      </div>
    </div>
  );
};

export default FirstPage;
