import React from 'react';
import { useWizard } from './WizardVM';
import styles from './Wizard.module.scss';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import QuestionComponent from './QuestionComponent';
import CityDropdown from '../cityDropdown/CityDropdown';

interface Props {
  closeButton: () => void;
}

function Wizard({ closeButton }: Props) {
  const {
    currentQuestionIndex,
    answers,
    handleNext,
    handlePrev,
    handleAnswerChange,
    progressPercentage,
    careerQuestions,
  } = useWizard();

  const currentQuestion = careerQuestions[currentQuestionIndex];

  const isAnswerValid = () => {
    if (!currentQuestion) return false;

    const answer = answers[currentQuestion.id];

    switch (currentQuestion.answerType) {
      case 'multiple-choice':
      case 'dropdown':
        return !!answer;
      case 'rating':
        return typeof answer === 'number';
      default:
        return false;
    }
  };

  return (
    <div className={styles.wizardPage}>
      <div className={styles.wizardContainer}>
        <button className={styles.closeButton} onClick={closeButton}>X</button>

        <progress
          value={progressPercentage()}
          max={100}
          className={styles['progress-bar']}
        />

        {currentQuestion && (
          <>
            <h2 className={styles.questionText}>{currentQuestion.question}</h2>
            {currentQuestion.answerType === 'dropdown' ? (
             <CityDropdown
              onCityChange={(city) => handleAnswerChange(currentQuestion.id, city)} />
          ) : (
        <QuestionComponent
    question={currentQuestion}
    answer={answers[currentQuestion.id]}
    onAnswerChange={(answer) =>
      handleAnswerChange(currentQuestion.id, answer)
    }
  />
)}
          </>
        )}

        <div>
          <button onClick={handlePrev} disabled={currentQuestionIndex === 0}>
            <FaChevronRight size={20} />
          </button>
          <button onClick={handleNext} disabled={!isAnswerValid()}>
            <FaChevronLeft size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
 
export default Wizard; 