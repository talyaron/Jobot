import React from 'react';
import styles from './Wizard.module.scss';
type AnswerType = "multiple-choice" | "text" | "rating" | "boolean";

interface CareerQuestion {
  id: number;
  question: string;
  answerType: AnswerType;
  options?: string[];
}

interface QuestionComponentProps {
  question: CareerQuestion;
  answer: any;
  onAnswerChange: (answer: any) => void;
  inputClassName?: string;
  selectClassName?: string;
  checkClassName?: string;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  question,
  answer,
  onAnswerChange,
  inputClassName,
  selectClassName,
  checkClassName,
}) => {
  switch (question.answerType) {
    case 'text':
      return (
        <input
          type="text"
          value={answer || ''}
          onChange={(e) => onAnswerChange(e.target.value)}
          className={inputClassName}
        />
      );
    case 'multiple-choice':
      return (
        <select
          value={answer || ''}
          onChange={(e) => onAnswerChange(e.target.value)}
          className={selectClassName}
        >
          <option value="">בחר תשובה</option>
          {question.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    case 'boolean':
      return (
        <div className={checkClassName}>
          <button
            onClick={() => onAnswerChange(true)}
            className={answer === true ? styles.selected : ''}
          >
            כן
          </button>
          <button
            onClick={() => onAnswerChange(false)}
            className={answer === false ? styles.selected : ''}
          >
            לא
          </button>
        </div>
      );
    case 'rating':
      return (
        <div className={checkClassName}>
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={() => onAnswerChange(rating)}
              className={answer === rating ? styles.selected : ''}
            >
              {rating}
            </button>
          ))}
        </div>
      );
    default:
      return null;
  }
};

export default QuestionComponent;
