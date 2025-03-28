import CityDropdown from "../cityDropdown/CityDropdown";

interface QuestionComponentProps {
  question: {
    id: number;
    question: string;
    answerType: 'multiple-choice' | 'dropdown' | 'text' | 'CityDropdown';
    options?: string[];
    placeholder?: string;
    apiUrl?: string;
  };
  answer: any;
  onAnswerChange: (answer: any) => void;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({ question, answer, onAnswerChange }) => {
  const isSingleChoice = question.id === 2 || question.id === 6;

  const handleSelect = (option: string) => {
    if (isSingleChoice) {
      onAnswerChange(option);
    } else {
      const selectedOptions = Array.isArray(answer) ? answer : [];
      let updatedSelection;
      if (selectedOptions.includes(option)) {
        updatedSelection = selectedOptions.filter((item) => item !== option);
      } else {
        updatedSelection = [...selectedOptions, option];
      }
      onAnswerChange(updatedSelection);
    }
  };

  return (
    <div className="question-container">
      <div className="question-body">
        <h2 className="question-title">{question.question}</h2>
        
        {question.answerType === 'multiple-choice' && (
          <div className="multiWizard">
            {question.options?.map((option) => (
              <button
                key={option}
                className={`option-button ${answer === option || (Array.isArray(answer) && answer.includes(option)) ? 'selected' : ''}`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}

{question.answerType === 'CityDropdown' && (
  <div className="dropdown">
    <CityDropdown onCityChange={onAnswerChange} />
  </div>
)}

{question.answerType === 'dropdown' && (
  <div className="dropdown">
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
  </div>
)}



        {question.answerType === 'text' && (
          <div className="input-container">
            <input
              type="text"
              value={answer || ''}
              onChange={(e) => onAnswerChange(e.target.value)}
              placeholder={question.placeholder || 'הקלד כאן...'}
              className="styled-input"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionComponent;
