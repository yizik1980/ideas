import { Injectable } from '@angular/core';
import { Cell, Difficulty, Fruit, MAZE_CONFIG, TriviaQuestion } from '../models';
import { TriviaService } from './trivia.service';

@Injectable({ providedIn: 'root' })
export class MazeService {
  constructor(private trivia: TriviaService) {}

  generate(difficulty: Difficulty): { grid: Cell[][]; fruits: Fruit[] } {
    const { rows, cols, fruits: fruitCount } = MAZE_CONFIG[difficulty];
    const grid = this.buildGrid(rows, cols);
    this.carve(grid, 0, 0);
    const fruits = this.placeFruits(grid, rows, cols, fruitCount, difficulty);
    return { grid, fruits };
  }

  private buildGrid(rows: number, cols: number): Cell[][] {
    return Array.from({ length: rows }, (_, r) =>
      Array.from({ length: cols }, (_, c) => ({
        row: r,
        col: c,
        walls: { top: true, right: true, bottom: true, left: true },
        visited: false,
      }))
    );
  }

  // Recursive backtracker (DFS)
  private carve(grid: Cell[][], row: number, col: number): void {
    const rows = grid.length;
    const cols = grid[0].length;
    grid[row][col].visited = true;

    const dirs = this.shuffle([
      { dr: -1, dc: 0, from: 'bottom', to: 'top' },
      { dr: 1,  dc: 0, from: 'top',    to: 'bottom' },
      { dr: 0,  dc: -1, from: 'right', to: 'left' },
      { dr: 0,  dc: 1,  from: 'left',  to: 'right' },
    ]);

    for (const { dr, dc, from, to } of dirs) {
      const nr = row + dr;
      const nc = col + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !grid[nr][nc].visited) {
        grid[row][col].walls[to as keyof Cell['walls']] = false;
        grid[nr][nc].walls[from as keyof Cell['walls']] = false;
        this.carve(grid, nr, nc);
      }
    }
  }

  private shuffle<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  private placeFruits(
    grid: Cell[][],
    rows: number,
    cols: number,
    count: number,
    difficulty: Difficulty
  ): Fruit[] {
    const questions = this.trivia.getRandomQuestions(difficulty, count);
    const positions: { row: number; col: number }[] = [];

    while (positions.length < count) {
      const r = Math.floor(Math.random() * rows);
      const c = Math.floor(Math.random() * cols);
      // avoid start (0,0) and exit (rows-1, cols-1)
      if ((r === 0 && c === 0) || (r === rows - 1 && c === cols - 1)) continue;
      if (positions.some(p => p.row === r && p.col === c)) continue;
      positions.push({ row: r, col: c });
    }

    return positions.map((pos, i) => ({
      row: pos.row,
      col: pos.col,
      collected: false,
      questionId: questions[i]?.id ?? i + 1,
    }));
  }
}
