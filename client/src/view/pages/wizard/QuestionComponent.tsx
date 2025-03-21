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

  switch (question.answerType) {
    case 'multiple-choice':
      return (
        <div>
          <p>{question.question}</p>
          <div>
            {question.options?.map((option) => (
              <button key={option} onClick={() => handleSelect(option)}>
                {answer === option || (Array.isArray(answer) && answer.includes(option)) ? "✔" : ""} {option}
              </button>
            ))}
          </div>
        </div>
      );

    case 'dropdown':
      return (
        <select value={answer || ''} onChange={(e) => onAnswerChange(e.target.value)}>
          <option value="">בחר תשובה</option>
          {question.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );

    default:
      return null;
  }
};

export default QuestionComponent;
