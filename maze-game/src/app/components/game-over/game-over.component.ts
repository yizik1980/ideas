import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Difficulty, DIFFICULTY_LABELS, GameResult } from '../../models';
import { DbService } from '../../services/db.service';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-game-over',
  standalone: true,
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.scss',
})
export class GameOverComponent implements OnInit {
  private router = inject(Router);
  private gameState = inject(GameStateService);
  private db = inject(DbService);

  lastResult = this.gameState.lastResult;
  topResults = signal<GameResult[]>([]);

  async ngOnInit(): Promise<void> {
    if (!this.lastResult()) {
      this.router.navigate(['/']);
      return;
    }
    const top = await this.db.getTopResults(10);
    this.topResults.set(top);
  }

  timeBonus(seconds: number): number {
    return seconds < 600 ? 10 : seconds < 1200 ? 5 : 0;
  }

  diffLabel(d: Difficulty): string {
    return DIFFICULTY_LABELS[d];
  }

  formatTime(s: number): string {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  }

  playAgain(): void {
    this.gameState.clear();
    this.router.navigate(['/']);
  }
}
