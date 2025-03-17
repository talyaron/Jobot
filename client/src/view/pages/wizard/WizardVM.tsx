import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CityDropdown from '../cityDropdown/CityDropdown';

type AnswerType = "multiple-choice" | "rating"  | "dropdown";

interface CareerQuestion {
  id: number;
  question: string;
  answerType: AnswerType;
  placeholder?: string;
  options?: string[];
  apiUrl?: string;
}

const careerQuestions: CareerQuestion[] = [
  {
    id: 1,
    question: "איפה אתה מחפש עבודה? (עיר או אזור)",
    answerType: "dropdown",
    apiUrl: "https://data.gov.il/api/3/action/datastore_search/", 
  },
  {
    id: 2,
    question: "איזה סוג משרה הכי מתאים לך כרגע?",
    answerType: "multiple-choice",
    options: [
      "משרה מלאה (קבוע, חמשוש)",
      "משרה חלקית (כמה משמרות בשבוע)",
      "עבודה זמנית (לתקופה קצרה)",
      "עבודה לפי שעות (גמיש)",
      "עבודה במשמרות (כולל לילות וסופ\"שים)",
    ],
  },
  {
    id: 3,
    question: "באיזה תחום אתה רוצה לעבוד?",
    answerType: "multiple-choice",
    options: [
      "הייטק וטכנולוגיה",
      "משרד וניהול",
      "מכירות ושירות לקוחות",
      "עבודה טכנית או שטח",
      "מחסן ולוגיסטיקה",
      "אבטחה",
      "אחר",
    ],
  },
  {
    id: 4,
    question: "כמה אתה גמיש לעבוד במשמרות?",
    answerType: "multiple-choice",
    options: [
      "אין בעיה עם לילות/סופ\"שים",
      "גמיש חלקית (לילות או סופ\"שים)",
      "מעדיף שעות קבועות",
    ],
  },
  {
    id: 5,
    question: "מה הכי בולט בך מהצבא?",
    answerType: "multiple-choice",
    options: [
      "עבודה בלחץ",
      "פיקוד וניהול",
      "תקשורת עם אנשים",
      "ידע טכני (מחשבים, אלקטרוניקה, מכונאות)",
      "משמעת ואחריות",
      "עבודה פיזית או שטח",
    ],
  },
];

export function useWizard() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const navigate = useNavigate();

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < careerQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      navigate('/candidate');
    }
  };

  const handleAnswerChange = (questionId: number, answer: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const progressPercentage = () => {
    return ((currentQuestionIndex + 1) / careerQuestions.length) * 100;
  };

  return {
    currentQuestionIndex,
    answers,
    handleNext,
    handlePrev,
    handleAnswerChange,
    progressPercentage,
    careerQuestions,
  }; 
}