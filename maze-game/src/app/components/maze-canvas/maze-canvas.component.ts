import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { Cell, Fruit, MAZE_CONFIG, TriviaQuestion } from '../../models';
import { DbService } from '../../services/db.service';
import { GameStateService } from '../../services/game-state.service';
import { MazeService } from '../../services/maze.service';
import { TriviaService } from '../../services/trivia.service';

const CELL_SIZES: Record<string, number> = {
  gan: 72, '1-2': 56, '3-4': 44, '5-6': 36,
};

@Component({
  selector: 'app-maze-canvas',
  standalone: true,
  templateUrl: './maze-canvas.component.html',
  styleUrl: './maze-canvas.component.scss',
})
export class MazeCanvasComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mazeCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private router = inject(Router);
  private gameState = inject(GameStateService);
  private mazeService = inject(MazeService);
  private triviaService = inject(TriviaService);
  private dbService = inject(DbService);

  config = this.gameState.config;

  // Game state
  grid: Cell[][] = [];
  fruits: Fruit[] = [];
  playerRow = 0;
  playerCol = 0;
  score = signal(0);
  elapsedSeconds = signal(0);

  // Trivia modal
  activeQuestion = signal<TriviaQuestion | null>(null);
  activeFruitIndex = -1;
  answerResult = signal<'correct' | 'wrong' | null>(null);

  private cellSize = 56;
  private rows = 0;
  private cols = 0;
  private timerInterval: ReturnType<typeof setInterval> | null = null;
  private inputBlocked = false;

  ngOnInit(): void {
    if (!this.config()) {
      this.router.navigate(['/']);
      return;
    }
    const diff = this.config()!.difficulty;
    const { rows, cols } = MAZE_CONFIG[diff];
    this.rows = rows;
    this.cols = cols;
    this.cellSize = CELL_SIZES[diff] ?? 50;

    const { grid, fruits } = this.mazeService.generate(diff);
    this.grid = grid;
    this.fruits = fruits;

    this.timerInterval = setInterval(() => {
      this.elapsedSeconds.update(s => s + 1);
    }, 1000);
  }

  ngAfterViewInit(): void {
    this.resizeCanvas();
    this.draw();
  }

  ngOnDestroy(): void {
    if (this.timerInterval) clearInterval(this.timerInterval);
  }

  @HostListener('window:keydown', ['$event'])
  onKey(e: KeyboardEvent): void {
    if (this.inputBlocked || this.activeQuestion()) return;
    type WallKey = keyof Cell['walls'];
    const moves: Record<string, [number, number, WallKey]> = {
      ArrowUp:    [-1,  0, 'top'    as WallKey],
      ArrowDown:  [ 1,  0, 'bottom' as WallKey],
      ArrowLeft:  [ 0, -1, 'left'   as WallKey],
      ArrowRight: [ 0,  1, 'right'  as WallKey],
    };
    const move = moves[e.key];
    if (!move) return;
    e.preventDefault();

    const [dr, dc, wall] = move;
    const cell = this.grid[this.playerRow][this.playerCol];
    if (cell.walls[wall]) return; // blocked by wall

    this.playerRow += dr;
    this.playerCol += dc;
    this.draw();
    this.checkFruit();
    this.checkExit();
  }

  private checkFruit(): void {
    const idx = this.fruits.findIndex(
      f => !f.collected && f.row === this.playerRow && f.col === this.playerCol
    );
    if (idx === -1) return;
    this.activeFruitIndex = idx;
    const q = this.triviaService.getQuestion(this.fruits[idx].questionId);
    if (q) {
      this.inputBlocked = true;
      this.activeQuestion.set(q);
    }
  }

  answerQuestion(index: number): void {
    const q = this.activeQuestion();
    if (!q) return;
    if (index === q.correctIndex) {
      this.score.update(s => s + q.points);
      this.answerResult.set('correct');
    } else {
      this.answerResult.set('wrong');
    }
    this.fruits[this.activeFruitIndex].collected = true;
    setTimeout(() => {
      this.activeQuestion.set(null);
      this.answerResult.set(null);
      this.inputBlocked = false;
      this.draw();
    }, 1200);
  }

  private checkExit(): void {
    if (this.playerRow === this.rows - 1 && this.playerCol === this.cols - 1) {
      this.inputBlocked = true;
      if (this.timerInterval) clearInterval(this.timerInterval);
      this.saveAndNavigate();
    }
  }

  private async saveAndNavigate(): Promise<void> {
    const cfg = this.config()!;
    const result = {
      playerName: cfg.playerName,
      avatarEmoji: cfg.avatar.emoji,
      difficulty: cfg.difficulty,
      score: this.score(),
      timeSeconds: this.elapsedSeconds(),
      completedAt: new Date().toISOString(),
    };
    const id = await this.dbService.saveResult(result);
    this.gameState.setLastResult({ ...result, id });
    this.router.navigate(['/game-over']);
  }

  // ─── Canvas drawing ────────────────────────────────────────────────────────

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = this.cols * this.cellSize;
    canvas.height = this.rows * this.cellSize;
  }

  draw(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawCells(ctx);
    this.drawExit(ctx);
    this.drawFruits(ctx);
    this.drawPlayer(ctx);
  }

  private drawCells(ctx: CanvasRenderingContext2D): void {
    const cs = this.cellSize;
    ctx.strokeStyle = '#4a2c8c';
    ctx.lineWidth = 2;
    ctx.fillStyle = '#fdf8ff';

    for (const row of this.grid) {
      for (const cell of row) {
        const x = cell.col * cs;
        const y = cell.row * cs;
        ctx.fillRect(x, y, cs, cs);
        if (cell.walls.top)    { ctx.beginPath(); ctx.moveTo(x, y);        ctx.lineTo(x + cs, y);        ctx.stroke(); }
        if (cell.walls.right)  { ctx.beginPath(); ctx.moveTo(x + cs, y);   ctx.lineTo(x + cs, y + cs);   ctx.stroke(); }
        if (cell.walls.bottom) { ctx.beginPath(); ctx.moveTo(x, y + cs);   ctx.lineTo(x + cs, y + cs);   ctx.stroke(); }
        if (cell.walls.left)   { ctx.beginPath(); ctx.moveTo(x, y);        ctx.lineTo(x, y + cs);        ctx.stroke(); }
      }
    }
  }

  private drawExit(ctx: CanvasRenderingContext2D): void {
    const cs = this.cellSize;
    const x = (this.cols - 1) * cs;
    const y = (this.rows - 1) * cs;
    ctx.fillStyle = '#c8f7c5';
    ctx.fillRect(x + 2, y + 2, cs - 4, cs - 4);
    ctx.font = `${cs * 0.55}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🏁', x + cs / 2, y + cs / 2);
  }

  private drawFruits(ctx: CanvasRenderingContext2D): void {
    const cs = this.cellSize;
    for (const fruit of this.fruits) {
      if (fruit.collected) continue;
      const x = fruit.col * cs + cs / 2;
      const y = fruit.row * cs + cs / 2;
      ctx.font = `${cs * 0.5}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🍎', x, y);
    }
  }

  private drawPlayer(ctx: CanvasRenderingContext2D): void {
    const cs = this.cellSize;
    const x = this.playerCol * cs + cs / 2;
    const y = this.playerRow * cs + cs / 2;
    ctx.font = `${cs * 0.58}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.config()?.avatar.emoji ?? '🧒', x, y);
  }

  formatTime(s: number): string {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  }
}
