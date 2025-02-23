import React from 'react';
import { Link } from 'react-router-dom';
import TextChanger from '../textChanger/TextChanger';

const FirstPage = () => {
  return (
    <div>
      <h1>ג'ובוט</h1>
      <TextChanger />
      <Link to="/wizard">
        <button>העבודה המושלמת מחכה לך כאן</button>
      </Link>
      <Link to="/">
      <br />
        <button>לכל המשרות</button>
      </Link>
    </div>
  );
};

export default FirstPage;
