import React, { useState } from 'react';
import { useWizard } from './WizardVM';
import styles from './Wizard.module.scss';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import QuestionComponent from './QuestionComponent';

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

  const [isNextClicked, setIsNextClicked] = useState(false);
  const [isPrevClicked, setIsPrevClicked] = useState(false);

  const currentQuestion = careerQuestions[currentQuestionIndex];

  const isAnswerValid = () => {
    if (!currentQuestion) return false;

    switch (currentQuestion.answerType) {
      case 'multiple-choice':
      case 'text':
        return !!answers[currentQuestion.id];
      case 'boolean':
        return typeof answers[currentQuestion.id] === 'boolean';
      case 'rating':
        return typeof answers[currentQuestion.id] === 'number';
      default:
        return false;
    }
  };

  return (
    <div className={styles.wizardPage}>
      <div className={styles.wizardContainer}>
        <button className={styles.closeButton} onClick={closeButton}>X</button>

        {/* ✅ Progress bar is always rendered */}
        <div className={styles.progressBarContainer}>
          <progress value={progressPercentage()} max={100} className={styles.progressBar} />
        </div>

        {currentQuestion ? (
          <>
            <h2 className={styles.questionText}>{currentQuestion.question}</h2>
            <QuestionComponent
              question={currentQuestion}
              answer={answers[currentQuestion.id]}
              onAnswerChange={(answer) => handleAnswerChange(currentQuestion.id, answer)}
              inputClassName={styles.textInput} 
              selectClassName={styles.selectInput}
              checkClassName={styles.checks}
            />
          </>
        ) : (
          <p>Loading question...</p>
        )}

        <div className={styles.prevNextButtonsContainer}>
          <button
            className={`${styles.ArrowLeft} ${isPrevClicked ? styles.clicked : ''}`}
            onClick={() => {
              handlePrev();
              setIsPrevClicked(true);
            }}
            disabled={currentQuestionIndex === 0}
          >
            <FaChevronRight size={40} />
          </button>
          <button
            className={`${styles.ArrowRight} ${isNextClicked ? styles.clicked : ''}`}
            onClick={() => {
              handleNext();
              setIsNextClicked(true);
            }}
            disabled={!isAnswerValid()}
          >
            <FaChevronLeft size={40} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Wizard;
