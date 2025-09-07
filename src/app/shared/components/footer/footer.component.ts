import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  template: `
  <footer>
    <p>Un libro por semana, un hábito para toda la vida.</p>
    <nav>
      <a routerLink="/sobre-nosotros">Sobre nosotros</a>
    </nav>
    <div class="social-icons">
      <a href="https://www.instagram.com/proyecto52_oficial/" target="_blank" aria-label="Instagram">
        <i class="fab fa-instagram"></i>
      </a>
      <a href="https://www.tiktok.com/@proyecto52_oficial" target="_blank" aria-label="TikTok">
        <i class="fab fa-tiktok"></i>
      </a>
    </div>
  </footer>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {}