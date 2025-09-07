import { ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Book } from '../../shared/interfaces/book.interface';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { take } from 'rxjs';
import { PacksComponent } from '../../shared/components/packs/packs.component';
import { isPlatformBrowser } from '@angular/common';

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
  private meta = inject(Meta);
  private loaded = false;
  private cdr = inject(ChangeDetectorRef);

  platformId = inject(PLATFORM_ID);
  
  ngOnInit() {
    if (!this.loaded) {
      this.loaded = true;
      this.loadBooks();
      this.setMetaTags();
    }
  }

  private loadBooks() {
    this.loading.set(true);
    this.http.get<{ items: Book[] }>('/api/ofertas')
      .pipe(take(1))
      .subscribe({
        next: res => {
          this.bookList = res.items;
          this.loading.set(false);
          this.cdr.detectChanges();
          if (!isPlatformBrowser(this.platformId)) {
            this.addJsonLdBooks(res.items);
          }
        },
        error: () => this.loading.set(false)
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


  private addJsonLdBooks(books: Book[]) {
    const bookData = books.map(b => ({
      "@context": "https://schema.org",
      "@type": "Book",
      "name": b.title,
      "author": b.author,
      "url": `https://unlibroxsemana.com/libro/${b.title.replace(/\s+/g,'-').toLowerCase()}`,
      "image": b.image,
      "numberOfPages": b.pages
    }));

    const jsonLd = document.createElement('script');
    jsonLd.type = 'application/ld+json';
    jsonLd.text = JSON.stringify(bookData);
    document.head.appendChild(jsonLd);
  }
}
