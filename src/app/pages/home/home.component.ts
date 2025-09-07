import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Book } from '../../shared/interfaces/book.interface';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { filter } from 'rxjs';
import { PacksComponent } from '../../shared/components/packs/packs.component';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule, PacksComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private title = inject(Title);
  private meta = inject(Meta);

  bookList: Book[] = [];

  constructor() {
    this.setMetaTags();
  }

  ngOnInit() {
    // Cargar libros inicialmente
    this.loadBooks();

    // Recargar libros si se navega dentro de la app
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadBooks();
        this.setMetaTags();
      });
  }

  private loadBooks() {
    this.http.get<{ items: Book[] }>('/api/ofertas')
      .subscribe({
        next: res => {
          this.bookList = res.items;
          this.cdr.detectChanges();
        },
        error: err => {
          console.error('Error cargando libros:', err);
        }
      });
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = '/assets/fallback-book.webp';
  }

  private setMetaTags() {
    const titleText = "Recomendaciones de Libros Cortos y Adictivos - Un libro por semana";
    const descriptionText = "Encuentra las mejores recomendaciones de libros cortos y adictivos en un solo lugar. Explora una amplia variedad de géneros y autores.";

    // Título y meta description
    this.title.setTitle(titleText);
    this.meta.updateTag({ name: 'description', content: descriptionText });
    this.meta.updateTag({ name: 'keywords', content: 'libros, recomendaciones, lectura, packs, descuentos' });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: titleText });
    this.meta.updateTag({ property: 'og:description', content: descriptionText });
    this.meta.updateTag({ property: 'og:url', content: 'https://unlibroxsemana.com/' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: titleText });
    this.meta.updateTag({ name: 'twitter:description', content: descriptionText });

    // Canonical
    this.meta.updateTag({ rel: 'canonical', href: 'https://unlibroxsemana.com/' } as any);
  }
}
