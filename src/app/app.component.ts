import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent,  FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class App {
  protected readonly title = signal('Un libro por semana');
}
