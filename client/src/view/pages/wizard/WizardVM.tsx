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
    placeholder: "באזרחות עובדים קל”ב",

  },
  {
    id: 2,
    question: "איזה סוג משרה הכי מתאים לך כרגע?",
    answerType: "multiple-choice",
    options: [
      "משרה מלאה",
      "משרה חלקית",
      "עבודה זמנית",
      "עבודה לפי שעות",
      "עבודה במשמרות",
    ],

  },
  {
    id: 3,
    question: "בחר את תחום העבודה שמתאים לך",
    answerType: "multiple-choice",
    options: [
      "💻 הייטק וטכנולוגיה",
      "🏢 משרד וניהול",
      "🛒 מכירות ושירות לקוחות",
      "🔧 עבודה טכנית או שטח",
      "📦 מחסן ולוגיסטיקה",
      "🛡️ אבטחה",
      "❓ אחר",
    ],
    placeholder: "בחר את תחום העבודה שמתאים לך",
  },

  {
    id: 4,
    question: "איזה מיומנויות מהשירות אתה מביא איתך לאזרחות? (וכמובן לעבודה)",
    answerType: "multiple-choice",
    options: [
      "🎯 יכולת עבודה תחת לחץ",
      "👥 ניסיון בניהול ופיקוד",
      "🗣️ כישורי שירות ותקשורת עם אנשים",
      "🛠️ ידע טכני (מחשבים, אלקטרוניקה, מכונאות וכו')",
      "🚀 יכולת עבודה פיזית / שטח",
      "🔍 דיוק ושימת לב לפרטים קטנים", 
      "🌍 התנהלות מול מגוון אוכלוסיות ורקעים שונים",
      "❓ אחר",
    ],
    placeholder: "בחר עד 2 מיומנויות",
  },
  {
    id: 5,
    question: "כמה אתה גמיש לעבוד במשמרות?",
    answerType: "multiple-choice",
    options: [
      "🌙 אין בעיה עם לילות/סופי שבוע",
      "⚖️ גמיש חלקית (רק לילות או רק סופי שבוע)",
      "🕒 מעדיף עבודה בשעות קבועות",
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