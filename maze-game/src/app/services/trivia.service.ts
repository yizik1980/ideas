import { Injectable } from '@angular/core';
import { Difficulty, TriviaQuestion } from '../models';

const QUESTIONS: TriviaQuestion[] = [
  // ===== גן =====
  { id:  1, difficulty: 'gan', category: 'math',    points: 1,  question: 'כמה זה 1 + 1?',                   answers: ['1', '2', '3', '4'],                        correctIndex: 1 },
  { id:  2, difficulty: 'gan', category: 'math',    points: 1,  question: 'כמה זה 2 + 2?',                   answers: ['3', '4', '5', '6'],                        correctIndex: 1 },
  { id:  3, difficulty: 'gan', category: 'science', points: 1,  question: 'כמה רגליים יש לכלב?',             answers: ['2', '4', '6', '8'],                        correctIndex: 1 },
  { id:  4, difficulty: 'gan', category: 'science', points: 1,  question: 'איזה צבע הוא השמש?',              answers: ['כחול', 'ירוק', 'צהוב', 'אדום'],            correctIndex: 2 },
  { id:  5, difficulty: 'gan', category: 'science', points: 1,  question: 'מה עושים דגים במים?',             answers: ['הולכים', 'שוחים', 'עפים', 'ישנים'],        correctIndex: 1 },
  { id:  6, difficulty: 'gan', category: 'math',    points: 1,  question: 'כמה זה 3 + 1?',                   answers: ['2', '3', '4', '5'],                        correctIndex: 2 },
  { id:  7, difficulty: 'gan', category: 'science', points: 1,  question: 'כמה רגליים לציפור?',              answers: ['2', '4', '6', '0'],                        correctIndex: 0 },
  { id:  8, difficulty: 'gan', category: 'math',    points: 1,  question: 'כמה זה 5 - 2?',                   answers: ['1', '2', '3', '4'],                        correctIndex: 2 },
  { id:  9, difficulty: 'gan', category: 'science', points: 1,  question: 'מה צבע הדשא?',                    answers: ['אדום', 'כחול', 'ירוק', 'צהוב'],            correctIndex: 2 },
  { id: 10, difficulty: 'gan', category: 'math',    points: 1,  question: 'כמה זה 4 + 3?',                   answers: ['5', '6', '7', '8'],                        correctIndex: 2 },
  { id: 11, difficulty: 'gan', category: 'science', points: 1,  question: 'כמה אוזניים יש לארנבת?',          answers: ['1', '2', '3', '4'],                        correctIndex: 1 },
  { id: 12, difficulty: 'gan', category: 'math',    points: 1,  question: 'כמה זה 10 - 3?',                  answers: ['5', '6', '7', '8'],                        correctIndex: 2 },
  { id: 13, difficulty: 'gan', category: 'science', points: 1,  question: 'מה בעל החיים הכי גדול?',          answers: ['פיל', 'לווייתן', 'ג׳ירפה', 'קרינוקרוס'],  correctIndex: 1 },
  { id: 14, difficulty: 'gan', category: 'math',    points: 1,  question: 'כמה זה 2 + 5?',                   answers: ['6', '7', '8', '9'],                        correctIndex: 1 },
  { id: 15, difficulty: 'gan', category: 'science', points: 1,  question: 'איזה עונה קרה?',                  answers: ['קיץ', 'אביב', 'חורף', 'סתיו'],            correctIndex: 2 },
  { id: 16, difficulty: 'gan', category: 'math',    points: 1,  question: 'כמה זה 6 + 2?',                   answers: ['7', '8', '9', '10'],                       correctIndex: 1 },
  { id: 17, difficulty: 'gan', category: 'science', points: 1,  question: 'מה עצים נותנים לנו לנשום?',       answers: ['מים', 'אבק', 'חמצן', 'חנקן'],              correctIndex: 2 },
  { id: 18, difficulty: 'gan', category: 'math',    points: 1,  question: 'כמה זה 9 - 4?',                   answers: ['3', '4', '5', '6'],                        correctIndex: 2 },
  { id: 19, difficulty: 'gan', category: 'science', points: 1,  question: 'מה עושה פרפר?',                   answers: ['שוחה', 'עף', 'קופץ', 'חופר'],              correctIndex: 1 },
  { id: 20, difficulty: 'gan', category: 'math',    points: 1,  question: 'כמה זה 1 + 4?',                   answers: ['3', '4', '5', '6'],                        correctIndex: 2 },

  // ===== א-ב =====
  { id: 21, difficulty: '1-2', category: 'math',    points: 1, question: 'כמה זה 5 + 7?',                   answers: ['10', '11', '12', '13'],                    correctIndex: 2 },
  { id: 22, difficulty: '1-2', category: 'math',    points: 1, question: 'כמה זה 8 × 2?',                   answers: ['14', '16', '18', '20'],                    correctIndex: 1 },
  { id: 23, difficulty: '1-2', category: 'science', points: 1, question: 'מה קורה לקרח כשחם?',              answers: ['מתקשה', 'נמס', 'נעלם', 'צובע'],            correctIndex: 1 },
  { id: 24, difficulty: '1-2', category: 'science', points: 1, question: 'כמה שניות יש בדקה?',              answers: ['30', '45', '60', '100'],                   correctIndex: 2 },
  { id: 25, difficulty: '1-2', category: 'math',    points: 1, question: 'כמה זה 14 - 6?',                  answers: ['6', '7', '8', '9'],                        correctIndex: 2 },
  { id: 26, difficulty: '1-2', category: 'science', points: 1, question: 'איזה פרי צהוב וחמוץ?',            answers: ['תפוח', 'לימון', 'ענב', 'אבטיח'],           correctIndex: 1 },
  { id: 27, difficulty: '1-2', category: 'math',    points: 1, question: 'כמה זה 3 × 4?',                   answers: ['10', '11', '12', '13'],                    correctIndex: 2 },
  { id: 28, difficulty: '1-2', category: 'science', points: 1, question: 'כמה דקות יש בשעה?',               answers: ['30', '60', '90', '100'],                   correctIndex: 1 },
  { id: 29, difficulty: '1-2', category: 'math',    points: 1, question: 'כמה זה 20 + 15?',                 answers: ['30', '35', '40', '45'],                    correctIndex: 1 },
  { id: 30, difficulty: '1-2', category: 'science', points: 1, question: 'כמה ימים בשבוע?',                 answers: ['5', '6', '7', '8'],                        correctIndex: 2 },
  { id: 31, difficulty: '1-2', category: 'math',    points: 1, question: 'כמה זה 9 × 3?',                   answers: ['18', '21', '27', '30'],                    correctIndex: 2 },
  { id: 32, difficulty: '1-2', category: 'science', points: 1, question: 'מה הצמח צריך כדי לגדול?',         answers: ['מלח', 'שמן', 'אור ומים', 'חלב'],           correctIndex: 2 },
  { id: 33, difficulty: '1-2', category: 'math',    points: 1, question: 'כמה זה 50 - 18?',                 answers: ['28', '30', '32', '34'],                    correctIndex: 2 },
  { id: 34, difficulty: '1-2', category: 'science', points: 1, question: 'כמה חודשים בשנה?',                answers: ['10', '11', '12', '13'],                    correctIndex: 2 },
  { id: 35, difficulty: '1-2', category: 'math',    points: 1, question: 'כמה זה 6 × 5?',                   answers: ['25', '28', '30', '35'],                    correctIndex: 2 },
  { id: 36, difficulty: '1-2', category: 'science', points: 1, question: 'מה גדול יותר: ק"ג או גרם?',       answers: ['גרם', 'שווה', 'ק"ג', 'תלוי'],              correctIndex: 2 },
  { id: 37, difficulty: '1-2', category: 'math',    points: 1, question: 'כמה זה 100 - 37?',                answers: ['57', '61', '63', '73'],                    correctIndex: 2 },
  { id: 38, difficulty: '1-2', category: 'science', points: 1, question: 'באיזה עונה פורחים פרחים?',        answers: ['חורף', 'קיץ', 'אביב', 'סתיו'],            correctIndex: 2 },
  { id: 39, difficulty: '1-2', category: 'math',    points: 1, question: 'כמה זה 7 × 7?',                   answers: ['42', '45', '49', '56'],                    correctIndex: 2 },
  { id: 40, difficulty: '1-2', category: 'science', points: 1, question: 'מה גורם לקשת בענן?',              answers: ['רוח', 'אור שמש + גשם', 'ברק', 'שלג'],     correctIndex: 1 },

  // ===== ג-ד =====
  { id: 41, difficulty: '3-4', category: 'math',    points: 1, question: 'כמה זה 7 × 8?',                   answers: ['48', '54', '56', '63'],                    correctIndex: 2 },
  { id: 42, difficulty: '3-4', category: 'math',    points: 1, question: 'כמה זה 144 ÷ 12?',                answers: ['10', '11', '12', '13'],                    correctIndex: 2 },
  { id: 43, difficulty: '3-4', category: 'science', points: 1, question: 'באיזו טמפרטורה מים רותחים?',      answers: ['50°C', '75°C', '100°C', '120°C'],          correctIndex: 2 },
  { id: 44, difficulty: '3-4', category: 'science', points: 1, question: 'מה הפלנטה הקרובה ביותר לשמש?',   answers: ['כדור הארץ', 'ונוס', 'מאדים', 'מרקורי'],   correctIndex: 3 },
  { id: 45, difficulty: '3-4', category: 'math',    points: 1, question: 'כמה זה 25% מ-200?',               answers: ['25', '40', '50', '75'],                    correctIndex: 2 },
  { id: 46, difficulty: '3-4', category: 'science', points: 1, question: 'מה נוסחת המים?',                  answers: ['CO₂', 'H₂O', 'O₂', 'NaCl'],               correctIndex: 1 },
  { id: 47, difficulty: '3-4', category: 'math',    points: 1, question: 'מה שורש ריבועי של 81?',           answers: ['7', '8', '9', '10'],                       correctIndex: 2 },
  { id: 48, difficulty: '3-4', category: 'science', points: 1, question: 'כמה שעות ביממה?',                 answers: ['12', '24', '36', '48'],                    correctIndex: 1 },
  { id: 49, difficulty: '3-4', category: 'math',    points: 1, question: 'כמה זה 13 × 13?',                 answers: ['156', '169', '172', '180'],                correctIndex: 1 },
  { id: 50, difficulty: '3-4', category: 'science', points: 1, question: 'כמה כוכבי לכת במערכת השמש?',      answers: ['7', '8', '9', '10'],                       correctIndex: 1 },
  { id: 51, difficulty: '3-4', category: 'math',    points: 1, question: 'כמה זה 360 ÷ 4?',                 answers: ['80', '90', '100', '120'],                  correctIndex: 1 },
  { id: 52, difficulty: '3-4', category: 'science', points: 1, question: 'מה עושה הכלורופיל בצמח?',         answers: ['שואב מים', 'מייצר אנרגיה מאור', 'מושך חרקים', 'מגן מקור'],  correctIndex: 1 },
  { id: 53, difficulty: '3-4', category: 'math',    points: 1, question: 'מה היקף ריבוע עם צלע 7?',         answers: ['21', '28', '35', '49'],                    correctIndex: 1 },
  { id: 54, difficulty: '3-4', category: 'science', points: 1, question: 'מה כוח המשיכה על כדור הארץ?',     answers: ['5 מ/ש²', '9.8 מ/ש²', '15 מ/ש²', '20 מ/ש²'], correctIndex: 1 },
  { id: 55, difficulty: '3-4', category: 'math',    points: 1, question: 'כמה זה 1000 - 375?',              answers: ['515', '625', '635', '725'],                correctIndex: 1 },
  { id: 56, difficulty: '3-4', category: 'science', points: 1, question: 'מאיזה חומר עשוי עצם?',            answers: ['ברזל', 'סידן', 'פחמן', 'אשלגן'],           correctIndex: 1 },
  { id: 57, difficulty: '3-4', category: 'math',    points: 1, question: 'כמה אלכסונים למלבן?',             answers: ['1', '2', '3', '4'],                        correctIndex: 1 },
  { id: 58, difficulty: '3-4', category: 'science', points: 1, question: 'מה הגז הנפוץ ביותר באוויר?',      answers: ['חמצן', 'פחמן דו-חמצני', 'חנקן', 'מימן'],  correctIndex: 2 },
  { id: 59, difficulty: '3-4', category: 'math',    points: 1, question: 'כמה זה 4³ (4 בחזקת 3)?',          answers: ['12', '32', '64', '128'],                   correctIndex: 2 },
  { id: 60, difficulty: '3-4', category: 'science', points: 1, question: 'כמה ריאות יש לאדם?',              answers: ['1', '2', '3', '4'],                        correctIndex: 1 },

  // ===== ה-ו =====
  { id: 61, difficulty: '5-6', category: 'math',    points: 1, question: 'כמה זה 15% מ-340?',               answers: ['34', '51', '68', '85'],                    correctIndex: 1 },
  { id: 62, difficulty: '5-6', category: 'math',    points: 1, question: 'מה נוסחת שטח המעגל?',             answers: ['2πr', 'πr²', 'πd', '4πr²'],               correctIndex: 1 },
  { id: 63, difficulty: '5-6', category: 'science', points: 1, question: 'כמה פרוטונים יש בפחמן (C)?',      answers: ['4', '6', '8', '12'],                       correctIndex: 1 },
  { id: 64, difficulty: '5-6', category: 'science', points: 1, question: 'מה מהירות האור?',                 answers: ['300,000 קמ/ש', '150,000 קמ/ש', '600,000 קמ/ש', '30,000 קמ/ש'], correctIndex: 0 },
  { id: 65, difficulty: '5-6', category: 'math',    points: 1, question: 'כמה זה 2⁸?',                      answers: ['128', '256', '512', '64'],                 correctIndex: 1 },
  { id: 66, difficulty: '5-6', category: 'science', points: 1, question: 'מה חוק ניוטון הראשון?',           answers: ['F=ma', 'גוף במנוחה נשאר במנוחה', 'לכל פעולה יש תגובה', 'כוח משיכה'], correctIndex: 1 },
  { id: 67, difficulty: '5-6', category: 'math',    points: 1, question: 'כמה זה √169?',                    answers: ['11', '12', '13', '14'],                    correctIndex: 2 },
  { id: 68, difficulty: '5-6', category: 'science', points: 1, question: 'כמה יסודות בטבלה המחזורית?',      answers: ['108', '112', '118', '126'],                correctIndex: 2 },
  { id: 69, difficulty: '5-6', category: 'math',    points: 1, question: 'כמה זה 7! (7 עצרת)?',             answers: ['720', '2520', '5040', '40320'],             correctIndex: 2 },
  { id: 70, difficulty: '5-6', category: 'science', points: 1, question: 'מה המשוואה E=mc² מייצגת?',        answers: ['אנרגיה קינטית', 'המרת מסה לאנרגיה', 'כוח גרביטציה', 'לחץ גז'], correctIndex: 1 },
  { id: 71, difficulty: '5-6', category: 'math',    points: 1, question: 'כמה זה 30% מ-450?',               answers: ['90', '115', '135', '145'],                 correctIndex: 2 },
  { id: 72, difficulty: '5-6', category: 'science', points: 1, question: 'מה מספר האטומי של זהב (Au)?',     answers: ['47', '74', '79', '82'],                    correctIndex: 2 },
  { id: 73, difficulty: '5-6', category: 'math',    points: 1, question: 'מה שיפוע הישר y = 3x - 5?',       answers: ['-5', '3', '-3', '5'],                      correctIndex: 1 },
  { id: 74, difficulty: '5-6', category: 'science', points: 1, question: 'כמה כרומוזומים בתא אנושי?',       answers: ['23', '46', '48', '92'],                    correctIndex: 1 },
  { id: 75, difficulty: '5-6', category: 'math',    points: 1, question: 'כמה זה log₁₀(1000)?',             answers: ['2', '3', '4', '10'],                       correctIndex: 1 },
  { id: 76, difficulty: '5-6', category: 'science', points: 1, question: 'מה pH של מים טהורים?',            answers: ['5', '6', '7', '8'],                        correctIndex: 2 },
  { id: 77, difficulty: '5-6', category: 'math',    points: 1, question: 'כמה צלעות לאוקטגון?',             answers: ['6', '7', '8', '9'],                        correctIndex: 2 },
  { id: 78, difficulty: '5-6', category: 'science', points: 1, question: 'מה תהליך הפוטוסינתזה מייצר?',     answers: ['CO₂ + מים', 'גלוקוז + חמצן', 'חנקן + מים', 'אלכוהול'], correctIndex: 1 },
  { id: 79, difficulty: '5-6', category: 'math',    points: 1, question: 'כמה זה sin(90°)?',                answers: ['0', '0.5', '1', '√2/2'],                   correctIndex: 2 },
  { id: 80, difficulty: '5-6', category: 'science', points: 1, question: 'מה חוק אוהם?',                    answers: ['V=IR', 'P=mv', 'F=ma', 'E=mc²'],           correctIndex: 0 },
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
