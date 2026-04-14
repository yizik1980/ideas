import { Injectable, signal } from '@angular/core';
import { GameConfig, GameResult } from '../models';

@Injectable({ providedIn: 'root' })
export class GameStateService {
  config = signal<GameConfig | null>(null);
  lastResult = signal<GameResult | null>(null);

  setConfig(cfg: GameConfig): void {
    this.config.set(cfg);
  }

  setLastResult(result: GameResult): void {
    this.lastResult.set(result);
  }

  clear(): void {
    this.config.set(null);
    this.lastResult.set(null);
  }
}
