import { Injectable } from '@angular/core';
import { Difficulty, TriviaQuestion } from '../models';

const QUESTIONS: TriviaQuestion[] = [
  // ===== גן =====
  { id: 1,  difficulty: 'gan', category: 'math',    points: 5,  question: 'כמה זה 1 + 1?',                answers: ['1', '2', '3', '4'],                 correctIndex: 1 },
  { id: 2,  difficulty: 'gan', category: 'math',    points: 5,  question: 'כמה זה 2 + 2?',                answers: ['3', '4', '5', '6'],                 correctIndex: 1 },
  { id: 3,  difficulty: 'gan', category: 'science', points: 5,  question: 'כמה רגליים יש לכלב?',          answers: ['2', '4', '6', '8'],                 correctIndex: 1 },
  { id: 4,  difficulty: 'gan', category: 'science', points: 5,  question: 'איזה צבע הוא השמש?',           answers: ['כחול', 'ירוק', 'צהוב', 'אדום'],     correctIndex: 2 },
  { id: 5,  difficulty: 'gan', category: 'science', points: 5,  question: 'מה עושים דגים במים?',          answers: ['הולכים', 'שוחים', 'עפים', 'ישנים'], correctIndex: 1 },
  { id: 6,  difficulty: 'gan', category: 'math',    points: 5,  question: 'כמה זה 3 + 1?',                answers: ['2', '3', '4', '5'],                 correctIndex: 2 },
  { id: 7,  difficulty: 'gan', category: 'science', points: 5,  question: 'כמה רגליים לציפור?',           answers: ['2', '4', '6', '0'],                 correctIndex: 0 },
  { id: 8,  difficulty: 'gan', category: 'math',    points: 5,  question: 'כמה זה 5 - 2?',                answers: ['1', '2', '3', '4'],                 correctIndex: 2 },

  // ===== א-ב =====
  { id: 9,  difficulty: '1-2', category: 'math',    points: 10, question: 'כמה זה 5 + 7?',                answers: ['10', '11', '12', '13'],             correctIndex: 2 },
  { id: 10, difficulty: '1-2', category: 'math',    points: 10, question: 'כמה זה 8 × 2?',                answers: ['14', '16', '18', '20'],             correctIndex: 1 },
  { id: 11, difficulty: '1-2', category: 'science', points: 10, question: 'מה קורה לקרח כשחם?',           answers: ['מתקשה', 'נמס', 'נעלם', 'צובע'],     correctIndex: 1 },
  { id: 12, difficulty: '1-2', category: 'science', points: 10, question: 'כמה שניות יש בדקה?',           answers: ['30', '45', '60', '100'],            correctIndex: 2 },
  { id: 13, difficulty: '1-2', category: 'math',    points: 10, question: 'כמה זה 14 - 6?',               answers: ['6', '7', '8', '9'],                 correctIndex: 2 },
  { id: 14, difficulty: '1-2', category: 'science', points: 10, question: 'איזה פרי צהוב וחמוץ?',         answers: ['תפוח', 'לימון', 'ענב', 'אבטיח'],   correctIndex: 1 },
  { id: 15, difficulty: '1-2', category: 'math',    points: 10, question: 'כמה זה 3 × 4?',                answers: ['10', '11', '12', '13'],             correctIndex: 2 },
  { id: 16, difficulty: '1-2', category: 'science', points: 10, question: 'כמה דקות יש בשעה?',            answers: ['30', '60', '90', '100'],            correctIndex: 1 },

  // ===== ג-ד =====
  { id: 17, difficulty: '3-4', category: 'math',    points: 15, question: 'כמה זה 7 × 8?',                answers: ['48', '54', '56', '63'],             correctIndex: 2 },
  { id: 18, difficulty: '3-4', category: 'math',    points: 15, question: 'כמה זה 144 ÷ 12?',             answers: ['10', '11', '12', '13'],             correctIndex: 2 },
  { id: 19, difficulty: '3-4', category: 'science', points: 15, question: 'באיזו טמפרטורה מים רותחים?',   answers: ['50°C', '75°C', '100°C', '120°C'],  correctIndex: 2 },
  { id: 20, difficulty: '3-4', category: 'science', points: 15, question: 'מה הפלנטה הקרובה ביותר לשמש?', answers: ['כדור הארץ', 'ונוס', 'מאדים', 'מרקורי'], correctIndex: 3 },
  { id: 21, difficulty: '3-4', category: 'math',    points: 15, question: 'כמה זה 25% מ-200?',            answers: ['25', '40', '50', '75'],             correctIndex: 2 },
  { id: 22, difficulty: '3-4', category: 'science', points: 15, question: 'מה נוסחת המים?',               answers: ['CO2', 'H2O', 'O2', 'NaCl'],         correctIndex: 1 },
  { id: 23, difficulty: '3-4', category: 'math',    points: 15, question: 'מה שורש ריבועי של 81?',        answers: ['7', '8', '9', '10'],                correctIndex: 2 },
  { id: 24, difficulty: '3-4', category: 'science', points: 15, question: 'כמה שעות ביממה?',              answers: ['12', '24', '36', '48'],             correctIndex: 1 },

  // ===== ה-ו =====
  { id: 25, difficulty: '5-6', category: 'math',    points: 20, question: 'כמה זה 15% מ-340?',            answers: ['34', '51', '68', '85'],             correctIndex: 1 },
  { id: 26, difficulty: '5-6', category: 'math',    points: 20, question: 'מה נוסחת שטח המעגל?',          answers: ['2πr', 'πr²', 'πd', '4πr²'],        correctIndex: 1 },
  { id: 27, difficulty: '5-6', category: 'science', points: 20, question: 'כמה פרוטונים יש בפחמן (C)?',   answers: ['4', '6', '8', '12'],                correctIndex: 1 },
  { id: 28, difficulty: '5-6', category: 'science', points: 20, question: 'מה מהירות האור?',              answers: ['300,000 קמ/ש', '150,000 קמ/ש', '600,000 קמ/ש', '30,000 קמ/ש'], correctIndex: 0 },
  { id: 29, difficulty: '5-6', category: 'math',    points: 20, question: 'כמה זה 2⁸?',                  answers: ['128', '256', '512', '64'],           correctIndex: 1 },
  { id: 30, difficulty: '5-6', category: 'science', points: 20, question: 'מה חוק ניוטון הראשון?',        answers: ['F=ma', 'גוף במנוחה נשאר במנוחה', 'לכל פעולה יש תגובה', 'כוח משיכה'], correctIndex: 1 },
  { id: 31, difficulty: '5-6', category: 'math',    points: 20, question: 'כמה זה √(169)?',               answers: ['11', '12', '13', '14'],             correctIndex: 2 },
  { id: 32, difficulty: '5-6', category: 'science', points: 20, question: 'כמה יסודות בטבלה המחזורית?',   answers: ['108', '112', '118', '126'],          correctIndex: 2 },
];

@Injectable({ providedIn: 'root' })
export class TriviaService {
  getByDifficulty(difficulty: Difficulty): TriviaQuestion[] {
    return QUESTIONS.filter(q => q.difficulty === difficulty);
  }

  getQuestion(id: number): TriviaQuestion | undefined {
    return QUESTIONS.find(q => q.id === id);
  }

  getRandomQuestions(difficulty: Difficulty, count: number): TriviaQuestion[] {
    const pool = this.getByDifficulty(difficulty);
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }
}
