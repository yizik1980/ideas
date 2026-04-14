import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AVATARS, Avatar, Difficulty, DIFFICULTY_LABELS } from '../../models';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-avatar-select',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './avatar-select.component.html',
  styleUrl: './avatar-select.component.scss',
})
export class AvatarSelectComponent {
  private router = inject(Router);
  private gameState = inject(GameStateService);

  avatars = AVATARS;
  selectedAvatar: Avatar = AVATARS[0];
  playerName = '';
  difficulty: Difficulty = 'gan';

  difficulties: { value: Difficulty; label: string }[] = [
    { value: 'gan',  label: DIFFICULTY_LABELS['gan'] },
    { value: '1-2',  label: DIFFICULTY_LABELS['1-2'] },
    { value: '3-4',  label: DIFFICULTY_LABELS['3-4'] },
    { value: '5-6',  label: DIFFICULTY_LABELS['5-6'] },
  ];

  selectAvatar(a: Avatar): void {
    this.selectedAvatar = a;
  }

  startGame(): void {
    if (!this.playerName.trim()) return;
    this.gameState.setConfig({
      playerName: this.playerName.trim(),
      avatar: this.selectedAvatar,
      difficulty: this.difficulty,
    });
    this.router.navigate(['/game']);
  }
}
