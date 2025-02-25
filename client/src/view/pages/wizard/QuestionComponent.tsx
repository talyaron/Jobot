import React from 'react';

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
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({ question, answer, onAnswerChange }) => {
  switch (question.answerType) {
    case 'text':
      return (
        <input
          type="text"
          value={answer || ''}
          onChange={(e) => onAnswerChange(e.target.value)}
        />
      );
    case 'multiple-choice':
      return (
        <select
          value={answer || ''}
          onChange={(e) => onAnswerChange(e.target.value)}
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
        <div>
          <button
            onClick={() => onAnswerChange(true)}
            className={answer === true ? 'selected' : ''}
          >
            כן
          </button>
          <button
            onClick={() => onAnswerChange(false)}
            className={answer === false ? 'selected' : ''}
          >
            לא
          </button>
        </div>
      );
    case 'rating':
      return (
        <div>
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={() => onAnswerChange(rating)}
              className={answer === rating ? 'selected' : ''}
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