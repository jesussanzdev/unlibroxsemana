import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, ParamMap, Data } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription, switchMap } from 'rxjs';
import { isPlatformBrowser, TitleCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Book } from '../../shared/interfaces/book.interface';

@Component({
  selector: 'app-category',
  imports: [TitleCasePipe],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID);

  slug: string = '';
  books: Book[] = [];
  private paramSub!: Subscription;


  ngOnInit() {
    this.paramSub = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.slug = params.get('slug') || '';
          return this.http.get<Book[]>(`/assets/data/${this.slug}.json`);
        })
      )
      .subscribe((books) => {
        this.books = [...books];
        this.cdr.detectChanges();

        this.setSeoTags();

        if (!isPlatformBrowser(this.platformId)) {
          this.addJsonLdBooks(books);
        }
      });
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = '/assets/fallback-book.webp';
  }

  ngOnDestroy() {
    this.paramSub.unsubscribe();
  }

  private setSeoTags() {
    const categoryName = this.slug.replace(/-/g, ' ');
    const titleText = `Libros cortos y adictivos en ${categoryName} - Un libro por semana`;
    const descriptionText = `Descubre los mejores libros cortos y adictivos en la categoría ${categoryName}. Fomenta tu hábito de lectura con lecturas cuidadosamente seleccionadas.`;

    // Title y meta description
    this.title.setTitle(titleText);
    this.meta.updateTag({ name: 'description', content: descriptionText });
    this.meta.updateTag({ name: 'keywords', content: `${categoryName}, libros, lectura, recomendaciones` });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: titleText });
    this.meta.updateTag({ property: 'og:description', content: descriptionText });
    this.meta.updateTag({ property: 'og:url', content: `https://unlibroxsemana.com/categorias/${this.slug}` });
    this.meta.updateTag({ property: 'og:type', content: 'website' });

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: titleText });
    this.meta.updateTag({ name: 'twitter:description', content: descriptionText });

    // Canonical
    this.meta.updateTag({ rel: 'canonical', href: `https://unlibroxsemana.com/categorias/${this.slug}` } as any);
  }

  /** JSON-LD dinámico para libros */
  private addJsonLdBooks(books: Book[]) {
    const bookData = books.map(b => ({
      "@context": "https://schema.org",
      "@type": "Book",
      "name": b.title,
      "author": b.author,
      "url": `https://unlibroxsemana.com/categorias/${b.title.replace(/\s+/g,'-').toLowerCase()}`,
      "image": b.image,
      "numberOfPages": b.pages
    }));

    const jsonLd = document.createElement('script');
    jsonLd.type = 'application/ld+json';
    jsonLd.text = JSON.stringify(bookData);
    document.head.appendChild(jsonLd);
  }
}