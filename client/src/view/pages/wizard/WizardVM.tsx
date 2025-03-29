import { useState } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/user/userSlice";

type AnswerType = "multiple-choice" | "dropdown" | "text" | "CityDropdown";

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
    placeholder:
      "תשכח רגע מהמשכורת - מה העבודה שהכי תגרום לך לקום עם חיוך בבוקר",
  },
];
interface Answers {
  [key: number]: string | string[];
}
export function useWizard() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const navigate = useNavigate();
  const [isFinished, setIsFinished] = useState(false);
  const user = useSelector(userSelector);

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      if (isFinished) {
        setIsFinished(false);
      }
    }
  };
  const handleSavePreferenceToServer = async () => {
    try {
      const preferences = {
        location: answers["1"],
        jobType: answers["2"],
        categories: answers["3"],
        skills: answers["4"],
        preferences: answers["5"],
      };

      const response = await fetch(
        `http://localhost:3000/api/user/set-user-preferences`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ preferences }),
          credentials: "include",
        }
      );
      if (response.ok) {
        navigate("/candidate");
      } else {
        throw new Error("An error occurred");
      }
    } catch (error) {
      console.error(error);
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
      if (user._id) {
        handleSavePreferenceToServer();
      } else {
        setIsFinished(true);
      }
    }
  };

  const handleAnswerChange = (
    questionId: number,
    answer: string | string[]
  ) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const progressPercentage = () => {
    return ((currentQuestionIndex + 1) / careerQuestions.length) * 100;
  };

  return {
    currentQuestionIndex,
    answers,
    isFinished,
    handleNext,
    handlePrev,
    handleAnswerChange,
    progressPercentage,
    careerQuestions,
  };
}
