// WizardVM.tsx
import { useState } from 'react';

type AnswerType = "multiple-choice" | "text" | "rating" | "boolean";

interface CareerQuestion {
  id: number;
  question: string;
  answerType: AnswerType;
  options?: string[];
}

const careerQuestions: CareerQuestion[] = [
  { id: 1, question: "מה שמך?", answerType: "text" },
  { id: 2, question: "באיזו עיר אתה גר?", answerType: "text" },
  { id: 3, question: "מהו הגיל שלך?", answerType: "text" },
  { id: 4, question: "איזה סוג משרה אתה מחפש?", answerType: "multiple-choice", options: ["מלאה", "חלקית", "פרילנס", "סטודנט"] },
  { id: 5, question: "האם יש לך השכלה אקדמית?", answerType: "boolean" },
  { id: 6, question: "מהי ההשכלה הגבוהה ביותר שלך?", answerType: "multiple-choice", options: ["תיכון", "לימודי תעודה", "תואר ראשון", "תואר שני", "דוקטורט"] },
  { id: 7, question: "כמה שנות ניסיון יש לך בתחום הרצוי?", answerType: "multiple-choice", options: ["אין ניסיון", "פחות משנה", "1-3 שנים", "3+ שנים"] },
  { id: 8, question: "באיזה תחום היית רוצה לעבוד?", answerType: "multiple-choice", options: ["הייטק", "ניהול", "עיצוב", "שירות לקוחות", "שיווק", "אחר"] },
  { id: 9, question: "מהם שלושת הדברים שאתה הכי נהנה לעשות ביום-יום שלך?", answerType: "text" },
  { id: 10, question: "אם לא היית צריך לדאוג לכסף, במה היית בוחר לעבוד?", answerType: "text" },
  { id: 11, question: "איזה סוג משימות גורם לך להרגיש מסופק ומלא מוטיבציה?", answerType: "text" },
  { id: 12, question: "האם אתה מעדיף לעבוד בצוות או לבד?", answerType: "multiple-choice", options: ["בצוות", "לבד", "תלוי במשימה"] },
  { id: 13, question: "עד כמה חשוב לך שהעבודה שלך תשפיע על אחרים?", answerType: "rating" },
  { id: 14, question: "איך אתה מתמודד עם מצבי לחץ בעבודה?", answerType: "text" },
  { id: 15, question: "האם אתה מעדיף עבודה עם מבנה ושגרה ברורה, או סביבה דינאמית ומשתנה?", answerType: "multiple-choice", options: ["שגרה ברורה", "סביבה דינאמית"] },
  { id: 16, question: "איך אתה מרגיש לגבי קבלת החלטות באופן עצמאי?", answerType: "rating" },
  { id: 17, question: "האם אתה מעדיף עבודה טכנית ומדויקת, או עבודה יצירתית ואומנותית?", answerType: "multiple-choice", options: ["טכנית ומדויקת", "יצירתית ואומנותית"] },
  { id: 18, question: "איך אתה מתמודד עם ביקורת בעבודה?", answerType: "text" },
  { id: 19, question: "האם אתה מעדיף לעבוד עם נתונים ומספרים או עם אנשים ורגשות?", answerType: "multiple-choice", options: ["נתונים ומספרים", "אנשים ורגשות"] },
  { id: 20, question: "מהי סביבת העבודה האידיאלית עבורך?", answerType: "text" }
];

export function useWizard() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < careerQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      alert("סיימת את השאלון!");
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