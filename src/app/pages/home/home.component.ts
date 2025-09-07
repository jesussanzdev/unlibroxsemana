import { Component, inject, OnInit } from '@angular/core';
import { Book } from '../../shared/interfaces/book.interface';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { filter, map, Observable, startWith, switchMap } from 'rxjs';
import { PacksComponent } from '../../shared/components/packs/packs.component';
import { Router, NavigationEnd } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [FormsModule, PacksComponent, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);
  private title = inject(Title);
  private meta = inject(Meta);

  books$!: Observable<Book[]>;

  constructor() {
    this.setMetaTags();
  }

  ngOnInit() {
    // Observable reactivo que escucha cambios de navegación y carga libros
    this.books$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      startWith(true),
      switchMap(() =>
        this.http.get<{ items: Book[] }>('/api/ofertas').pipe(
          map(res => res.items)
        )
      )
    );
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = '/assets/fallback-book.webp';
  }

  private setMetaTags() {
    const titleText = "Recomendaciones de Libros Cortos y Adictivos - Un libro por semana";
    const descriptionText = "Encuentra las mejores recomendaciones de libros cortos y adictivos en un solo lugar. Explora una amplia variedad de géneros y autores.";

    this.title.setTitle(titleText);
    this.meta.updateTag({ name: 'description', content: descriptionText });
    this.meta.updateTag({ name: 'keywords', content: 'libros, recomendaciones, lectura, packs, descuentos' });

    this.meta.updateTag({ property: 'og:title', content: titleText });
    this.meta.updateTag({ property: 'og:description', content: descriptionText });
    this.meta.updateTag({ property: 'og:url', content: 'https://unlibroxsemana.com/' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: titleText });
    this.meta.updateTag({ name: 'twitter:description', content: descriptionText });

    this.meta.updateTag({ rel: 'canonical', href: 'https://unlibroxsemana.com/' } as any);
  }
}
