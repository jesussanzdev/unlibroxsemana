import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterModule],
  template: `
  <footer>
  <p>Un libro por semana, un hábito para toda la vida.</p>
  <nav>
    <a routerLink="/sobre-nosotros">Sobre nosotros</a>
  </nav>
</footer>
`,
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
}
