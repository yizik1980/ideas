import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/avatar-select/avatar-select.component').then(
        m => m.AvatarSelectComponent
      ),
  },
  {
    path: 'game',
    loadComponent: () =>
      import('./components/maze-canvas/maze-canvas.component').then(
        m => m.MazeCanvasComponent
      ),
  },
  {
    path: 'game-over',
    loadComponent: () =>
      import('./components/game-over/game-over.component').then(
        m => m.GameOverComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
