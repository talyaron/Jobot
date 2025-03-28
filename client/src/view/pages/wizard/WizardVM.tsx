import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';


type AnswerType = "multiple-choice"  | "dropdown" | "text" | "CityDropdown";

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
    answerType: "CityDropdown",
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
    answerType: "dropdown",
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
    answerType: "dropdown",
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
  {
    id: 6,
    question: "מהם שלושת הדברים שהכי חשובים לך במקום העבודה?",
    answerType: "text",
    placeholder: "משכורת טובה? בוס נחמד? קפה חינם? ספר לנו מה הכי חשוב לך! 😊",
  },
  {
    id: 7,
    question: "אם כסף לא היה שיקול, באיזה תחום או סוג עבודה היית בוחר לעסוק?",
    answerType: "text",
    placeholder: "תשכח רגע מהמשכורת - מה העבודה שהכי תגרום לך לקום עם חיוך בבוקר",
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
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
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