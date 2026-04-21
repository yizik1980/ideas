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
import { Cell, Fruit, TriviaQuestion } from '../../models';
import { DbService } from '../../services/db.service';
import { GameStateService } from '../../services/game-state.service';
import { MazeService } from '../../services/maze.service';
import { TriviaService } from '../../services/trivia.service';
import { SoundService } from '../../services/sound.service';
import { STAGE_CONFIG } from '../../const/grid';

const MAX_CELL_SIZES: Record<string, number> = {
  gan: 72, '1-2': 56, '3-4': 44, '5-6': 36, '7-8': 30, '9-10': 26, '11-12': 26, university: 26,
};

const MAX_WRONGS = 2;

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
  private sound = inject(SoundService);

  config = this.gameState.config;

  // Game state
  grid: Cell[][] = [];
  fruits: Fruit[] = [];
  playerRow = 0;
  playerCol = 0;
  score = signal(0);
  elapsedSeconds = signal(0);

  // Stage & wrongs
  stageNum = signal(1);
  wrongsThisStage = signal(0);
  readonly maxWrongs = MAX_WRONGS;
  announcement = signal('');

  // Trivia modal
  activeQuestion = signal<TriviaQuestion | null>(null);
  activeFruitIndex = -1;
  answerResult = signal<'correct' | 'wrong' | null>(null);

  private stageIndex = 0;
  private cellSize = 56;
  private rows = 0;
  private cols = 0;
  private timerInterval: ReturnType<typeof setInterval> | null = null;
  private inputBlocked = false;
  private touchStartX = 0;
  private touchStartY = 0;

  ngOnInit(): void {
    if (!this.config()) {
      this.router.navigate(['/']);
      return;
    }
    this.triviaService.resetSession();
    this.loadStage(0);
    this.sound.gameStart();
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

  private loadStage(index: number, showAnnouncement = false): void {
    this.stageIndex = index;
    const cfg = STAGE_CONFIG[index];
    this.rows = cfg.rows;
    this.cols = cfg.cols;
    this.playerRow = 0;
    this.playerCol = 0;
    this.wrongsThisStage.set(0);
    this.stageNum.set(cfg.stage);
    this.computeCellSize();

    const diff = this.config()!.difficulty;
    const cat = this.config()!.category;
    const { grid, fruits } = this.mazeService.generate(diff, cat, cfg.rows, cfg.cols, cfg.fruits);
    this.grid = grid;
    this.fruits = fruits;

    if (showAnnouncement) {
      // canvas already exists — resize and redraw after brief announcement
      this.resizeCanvas();
      this.draw();
    }
  }

  private computeCellSize(): void {
    const diff = this.config()!.difficulty;
    const maxFromDiff = MAX_CELL_SIZES[diff] ?? 50;
    const availW = window.innerWidth - 32;
    const availH = window.innerHeight - 220;
    const cellFromScreen = Math.floor(Math.min(availW / this.cols, availH / this.rows));
    this.cellSize = Math.min(maxFromDiff, Math.max(14, cellFromScreen));
  }

  @HostListener('window:resize')
  onResize(): void {
    if (!this.grid.length) return;
    this.computeCellSize();
    this.resizeCanvas();
    this.draw();
  }

  @HostListener('window:touchstart', ['$event'])
  onTouchStart(e: TouchEvent): void {
    this.touchStartX = e.touches[0].clientX;
    this.touchStartY = e.touches[0].clientY;
  }

  @HostListener('window:touchend', ['$event'])
  onTouchEnd(e: TouchEvent): void {
    const dx = e.changedTouches[0].clientX - this.touchStartX;
    const dy = e.changedTouches[0].clientY - this.touchStartY;
    if (Math.abs(dx) < 30 && Math.abs(dy) < 30) return;
    if (Math.abs(dx) > Math.abs(dy)) {
      this.tryMove(0, dx > 0 ? 1 : -1, dx > 0 ? 'right' : 'left');
    } else {
      this.tryMove(dy > 0 ? 1 : -1, 0, dy > 0 ? 'bottom' : 'top');
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKey(e: KeyboardEvent): void {
    type WallKey = keyof Cell['walls'];
    const moves: Record<string, [number, number, WallKey]> = {
      ArrowUp: [-1, 0, 'top'],
      ArrowDown: [1, 0, 'bottom'],
      ArrowLeft: [0, -1, 'left'],
      ArrowRight: [0, 1, 'right'],
    };
    const move = moves[e.key];
    if (!move) return;
    e.preventDefault();
    this.tryMove(...move);
  }

  tryMove(dr: number, dc: number, wall: keyof Cell['walls']): void {
    if (this.inputBlocked || this.activeQuestion()) return;
    const cell = this.grid[this.playerRow][this.playerCol];
    if (cell.walls[wall]) return;
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
      this.sound.fruitCollect();
      this.inputBlocked = true;
      this.activeQuestion.set(q);
    }
  }

  answerQuestion(index: number): void {
    const q = this.activeQuestion();
    if (!q) return;

    if (index === q.correctIndex) {
      this.score.update(s => s + q.points);
      this.sound.correctAnswer();
      this.answerResult.set('correct');
    } else {
      this.sound.wrongAnswer();
      this.answerResult.set('wrong');
      if (this.stageIndex > 0) {
        const newWrongs = this.wrongsThisStage() + 1;
        this.wrongsThisStage.set(newWrongs);
        if (newWrongs >= MAX_WRONGS) {
          this.fruits[this.activeFruitIndex].collected = true;
          setTimeout(() => {
            this.activeQuestion.set(null);
            this.answerResult.set(null);
            this.inputBlocked = false;
            this.triggerStageBack();
          }, 2200);
          return;
        }
      }
    }

    this.fruits[this.activeFruitIndex].collected = true;
    setTimeout(() => {
      this.activeQuestion.set(null);
      this.answerResult.set(null);
      this.inputBlocked = false;
      this.draw();
    }, 2200);
  }

  private triggerStageBack(): void {
    const prevIndex = this.stageIndex - 1;
    this.inputBlocked = true;
    this.announcement.set(`⬇️ חזרה לשלב ${STAGE_CONFIG[prevIndex].stage}`);
    setTimeout(() => {
      this.announcement.set('');
      this.loadStage(prevIndex, true);
      this.inputBlocked = false;
    }, 2000);
  }

  private checkExit(): void {
    if (this.playerRow === this.rows - 1 && this.playerCol === this.cols - 1) {
      this.inputBlocked = true;
      if (this.stageIndex < STAGE_CONFIG.length - 1) {
        this.triggerNextStage();
      } else {
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.sound.gameOver();
        this.saveAndNavigate();
      }
    }
  }

  private triggerNextStage(): void {
    const nextIndex = this.stageIndex + 1;
    this.sound.stageComplete();
    this.announcement.set(`🎉 שלב ${STAGE_CONFIG[this.stageIndex].stage} הושלם! עוברים לשלב ${STAGE_CONFIG[nextIndex].stage}`);
    setTimeout(() => {
      this.announcement.set('');
      this.loadStage(nextIndex, true);
      this.inputBlocked = false;
    }, 2000);
  }

  private async saveAndNavigate(): Promise<void> {
    const cfg = this.config()!;
    const seconds = this.elapsedSeconds();
    const timeBonus = seconds < 600 ? 10 : seconds < 1200 ? 5 : 0;
    if (timeBonus > 0) this.score.update(s => s + timeBonus);

    const result = {
      playerName: cfg.playerName,
      avatarEmoji: cfg.avatar.emoji,
      difficulty: cfg.difficulty,
      score: this.score(),
      timeSeconds: seconds,
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
        if (cell.walls.top) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + cs, y); ctx.stroke(); }
        if (cell.walls.right) { ctx.beginPath(); ctx.moveTo(x + cs, y); ctx.lineTo(x + cs, y + cs); ctx.stroke(); }
        if (cell.walls.bottom) { ctx.beginPath(); ctx.moveTo(x, y + cs); ctx.lineTo(x + cs, y + cs); ctx.stroke(); }
        if (cell.walls.left) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + cs); ctx.stroke(); }
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

  get isEmojiQuestion(): boolean {
    const q = this.activeQuestion();
    return q?.difficulty === 'gan' && q?.category === 'hebrew';
  }

  formatTime(s: number): string {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  }
}
