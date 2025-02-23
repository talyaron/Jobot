import React, { useEffect, useState } from 'react';
import styles from './TextChanger.module.scss';

const words: string[] = [
  'טבח',
  'מלצרות',
  'אבטחה',
  'ייצור',
  'אדמיניסטרציה',
  'כבאות',
  'חינוך',
  'פיתוח',
  'מכירות',
  'שירות לקוחות',
  'ניהול',
  'מדיה חברתית',
'חקלאות',
'בנייה',
'ברמן',
'נהג'];

const TextChanger: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.textChanger}>
      <h1 className={styles.h1}>{words[index]}</h1>
    </div>
  );
};

export default TextChanger;
