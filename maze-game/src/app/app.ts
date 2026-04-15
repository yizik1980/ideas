import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <router-outlet />
    <footer class="app-footer">
      © {{ year }} IM · כל הזכויות שמורות
    </footer>
  `,
  styles: [`
    .app-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      text-align: center;
      font-size: 0.7rem;
      color: rgba(0,0,0,0.35);
      padding: 4px;
      pointer-events: none;
      font-family: 'Segoe UI', sans-serif;
      direction: rtl;
    }
  `],
})
export class App {
  year = new Date().getFullYear();
}
