import { useWizard } from './WizardVM';
import QuestionComponent from './QuestionComponent';

interface Props {
  closeButton: () => void;
}

function Wizard({ closeButton }: Props) {
  const {
    isFinished,
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
      case 'text':
      case 'dropdown':
        case 'CityDropdown':
        return !!answer;
      default:
        return false;
    }
  };

  return (
    <div className="overlay">
      <div className="popup">
        <button className="closeButton" onClick={closeButton}>X</button>

        <progress
          value={progressPercentage()}
          max={100}
          className="progress-bar"
        />
{isFinished ? (
 <h2>בבקשה התחבר כדי להמשיך</h2>
    
) :
        currentQuestion && (
            <QuestionComponent
              question={currentQuestion}
              answer={answers[currentQuestion.id]}
              onAnswerChange={(answer) => handleAnswerChange(currentQuestion.id, answer)}
            />
        )}

        <div>
          <button className="multiBtn"
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            aria-label="Previous Question"
          >
            <h3>הקודם</h3>
          </button>
         { isFinished ?
          <button className='multiBtn'
            onClick={closeButton}
            aria-label="Next Question"
          >
            <h3>סגירה</h3>
          </button>:<button className='multiBtn'
            onClick={handleNext}
            disabled={!isAnswerValid()}
            aria-label="Next Question"
          >
            <h3>המשך</h3>
          </button>}
        </div>
      </div>
    </div>
  );
}

export default Wizard;
