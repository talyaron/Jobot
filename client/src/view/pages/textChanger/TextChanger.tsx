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
  'נהג'
];

const TextChanger: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState(''); 
  const [isDeleting, setIsDeleting] = useState(false); 

  useEffect(() => {
    const currentWord = words[index];
    let delay = 150;

    if (isDeleting) {
      delay = 50;
    }

    if (!isDeleting && displayText === currentWord) {
      delay = 1500;
    }
    if (isDeleting && displayText === '') {
      delay = 100;
    }

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText !== currentWord) {
        setDisplayText(currentWord.substring(0, displayText.length + 1));
      } else if (isDeleting && displayText !== '') {
        setDisplayText(currentWord.substring(0, displayText.length - 1));
      } else if (!isDeleting && displayText === currentWord) {
        setIsDeleting(true);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setIndex((prevIndex) => (prevIndex + 1) % words.length);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, index]);

  return (
    <div className={styles.textChanger}>
      <h1 className={styles.h1}>{displayText}</h1>
    </div>
  );
};

export default TextChanger;
