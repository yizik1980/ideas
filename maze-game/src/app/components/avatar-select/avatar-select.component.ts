import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AVATARS, Avatar, Difficulty, DIFFICULTY_LABELS, TriviaCategory } from '../../models';
import { GameStateService } from '../../services/game-state.service';

const NAMES_KEY = 'maze_saved_names';
const MAX_SAVED = 5;

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
  category: TriviaCategory = 'math';
  savedNames: string[] = JSON.parse(localStorage.getItem(NAMES_KEY) ?? '[]');

  difficulties: { value: Difficulty; label: string }[] = [
    { value: 'gan',        label: DIFFICULTY_LABELS['gan'] },
    { value: '1-2',        label: DIFFICULTY_LABELS['1-2'] },
    { value: '3-4',        label: DIFFICULTY_LABELS['3-4'] },
    { value: '5-6',        label: DIFFICULTY_LABELS['5-6'] },
    { value: '7-8',        label: DIFFICULTY_LABELS['7-8'] },
    { value: '9-10',       label: DIFFICULTY_LABELS['9-10'] },
    { value: '11-12',      label: DIFFICULTY_LABELS['11-12'] },
    { value: 'university', label: DIFFICULTY_LABELS['university'] },
  ];

  categories: { value: TriviaCategory; label: string; emoji: string }[] = [
    { value: 'math',    label: 'מתמטיקה', emoji: '🔢' },
    { value: 'science', label: 'מדע',     emoji: '🔬' },
    { value: 'hebrew',  label: 'עברית',   emoji: '📖' },
  ];

  selectAvatar(a: Avatar): void {
    this.selectedAvatar = a;
  }

  selectSavedName(name: string): void {
    this.playerName = name;
  }

  startGame(): void {
    const name = this.playerName.trim();
    if (!name) return;
    this.saveName(name);
    this.gameState.setConfig({
      playerName: name,
      avatar: this.selectedAvatar,
      difficulty: this.difficulty,
      category: this.category,
    });
    this.router.navigate(['/game']);
  }

  private saveName(name: string): void {
    const updated = [name, ...this.savedNames.filter(n => n !== name)].slice(0, MAX_SAVED);
    localStorage.setItem(NAMES_KEY, JSON.stringify(updated));
  }
}
