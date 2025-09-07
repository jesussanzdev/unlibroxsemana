import { ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Book } from '../../shared/interfaces/book.interface';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { filter, switchMap, take } from 'rxjs';
import { PacksComponent } from '../../shared/components/packs/packs.component';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule, PacksComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  http = inject(HttpClient);
  loading = signal(false);
  bookList: Book[] = [];

  private title = inject(Title);
  private router = inject(Router);
  private meta = inject(Meta);
  private cdr = inject(ChangeDetectorRef);

  platformId = inject(PLATFORM_ID);

  constructor(){
      this.loadBooks();
      this.setMetaTags();
  }
  
  ngOnInit() {
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
