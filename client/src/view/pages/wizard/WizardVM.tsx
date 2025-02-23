import { useState } from "react";

export type QuestionType = "multipleChoice" | "openText" | "dropdown" | "composite" | "multipleSelect";

export interface Question {
  id: number;
  text: string;
  type: QuestionType;
  options?: string[];
  compositeOptions?: {
    cities?: string[];
    distances?: string[];
  };
}

const cities = ["תל אביב", "חיפה", "ירושלים", "באר שבע", "אשדוד"];
const distances = ["5 ק״מ", "10 ק״מ", "20 ק״מ", "50 ק״מ", "100 ק״מ"];

export const questions: Question[] = [
  {
    id: 1,
    text: "איזה משרה את/ה מחפש/ת?",
    type: "multipleChoice",
    options: ["משרה מלאה", "משרה חלקית"],
  },
  {
    id: 2,
    text: "בחר את מיקום העבודה הבאה שלך ואת המרחק ממך:",
    type: "composite",
    compositeOptions: {
      cities,
      distances,
    },
  },
  {
    id: 3,
    text: "מה סוג המשרה שמתאים לך?",
    type: "multipleSelect",
    options: [
      "כולל מגורים",
      "משמרות",
      "משרת בוקר",
      "היברידי",
      "פרילאנס",
      "עבודה בלילה",
      "עבודה בסופי שבוע",
    ],
  },
  {
    id: 4,
    text: "מה הדבר הכי חשוב לך במקום העבודה?",
    type: "openText",
  },
];

export function useWizard() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});

  const currentQuestion = questions[currentQuestionIndex];

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      alert("סיימת את השאלון!");
    }
  };

  const handleAnswerChange = (answer: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }));
  };

  const handleCompositeAnswerChange = (field: "city" | "distance", value: string) => {
    setAnswers((prev) => {
      const composite = prev[currentQuestion.id] || {};
      return { ...prev, [currentQuestion.id]: { ...composite, [field]: value } };
    });
  };

  const handleMultipleSelectChange = (option: string) => {
    setAnswers((prev) => {
      const currentAnswer: string[] = prev[currentQuestion.id] || [];
      if (currentAnswer.includes(option)) {
        return { ...prev, [currentQuestion.id]: currentAnswer.filter((opt) => opt !== option) };
      } else {
        return { ...prev, [currentQuestion.id]: [...currentAnswer, option] };
      }
    });
  };

  const progressPercentage = () => {
    return ((currentQuestionIndex + 1) / questions.length) * 100;
  };

  return {
    currentQuestion,
    currentQuestionIndex,
    answers,
    handleNext,
    handlePrev,
    handleAnswerChange,
    handleCompositeAnswerChange,
    handleMultipleSelectChange,
    progressPercentage,
  };
}
