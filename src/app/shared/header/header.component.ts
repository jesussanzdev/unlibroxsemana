import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  template: `<header>
    <nav>
      <a routerLink="/" class="logo">Mi Aplicación</a>
      <nav>
        <a routerLink="/policiaca" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Policiaca</a>
        <a routerLink="/terror" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Terror</a>
      </nav>
    </nav>
  </header>`,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
}
