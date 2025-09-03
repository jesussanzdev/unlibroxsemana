import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  template: `
<header>
  <nav class="navbar" aria-label="Main navigation">
    <a routerLink="/" class="logo" class="logo">1LXS</a>
    <div class="menu">
    <button class="menu-button"
            [attr.aria-expanded]="categoriesOpen"
            aria-controls="categories-list"
            (click)="toggleCategories()">
      Categorías ▾
    </button>

      <!-- Siempre renderizado para SEO -->
      <ul id="categories-list" class="dropdown" [class.show]="categoriesOpen">
        <li><a routerLink="/categorias/biografia">Biografía</a></li>
        <li><a routerLink="/categorias/ciencia-ficcion">Ciencia Ficción</a></li>
        <li><a routerLink="/categorias/ensayo">Ensayo</a></li>
        <li><a routerLink="/categorias/fantasia">Fantasía</a></li>
        <li><a routerLink="/categorias/misterio">Misterio/Suspense</a></li>
        <li><a routerLink="/categorias/romance">Romance/Drama</a></li>
      </ul>
    </div>
  </nav>
</header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  categoriesOpen = false;

  toggleCategories() {
    this.categoriesOpen = !this.categoriesOpen;
  }
}