export type Difficulty = 'gan' | '1-2' | '3-4' | '5-6';

export interface Avatar {
  id: number;
  emoji: string;
  label: string;
}

export interface GameConfig {
  playerName: string;
  avatar: Avatar;
  difficulty: Difficulty;
}

export interface GameResult {
  id?: number;
  playerName: string;
  avatarEmoji: string;
  difficulty: Difficulty;
  score: number;
  timeSeconds: number;
  completedAt: string; // ISO string
}

export interface Cell {
  row: number;
  col: number;
  walls: { top: boolean; right: boolean; bottom: boolean; left: boolean };
  visited: boolean;
}

export interface Fruit {
  row: number;
  col: number;
  collected: boolean;
  questionId: number;
}

export interface TriviaQuestion {
  id: number;
  question: string;
  answers: string[];
  correctIndex: number;
  points: number;
  difficulty: Difficulty;
  category: 'science' | 'math';
}

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  gan: 'גן',
  '1-2': 'כיתות א׳-ב׳',
  '3-4': 'כיתות ג׳-ד׳',
  '5-6': 'כיתות ה׳-ו׳',
};

export const MAZE_CONFIG: Record<Difficulty, { rows: number; cols: number; fruits: number }> = {
  gan:  { rows: 5,  cols: 5,  fruits: 3 },
  '1-2': { rows: 8,  cols: 8,  fruits: 4 },
  '3-4': { rows: 11, cols: 11, fruits: 5 },
  '5-6': { rows: 14, cols: 14, fruits: 6 },
};

export const AVATARS: Avatar[] = [
  { id: 1, emoji: '🧒', label: 'ילד' },
  { id: 2, emoji: '👧', label: 'ילדה' },
  { id: 3, emoji: '🦸', label: 'גיבור' },
  { id: 4, emoji: '🧙', label: 'קוסם' },
  { id: 5, emoji: '🐱', label: 'חתול' },
  { id: 6, emoji: '🐸', label: 'צפרדע' },
];
