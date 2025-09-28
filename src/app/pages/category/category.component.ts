import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Book } from '../../shared/interfaces/book.interface';
import { TitleCasePipe } from '@angular/common';

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
    this.meta.updateTag({ property: 'og:url', content: `https://www.unlibroxsemana.com/categorias/${this.slug}` });
    this.meta.updateTag({ property: 'og:type', content: 'website' });

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: titleText });
    this.meta.updateTag({ name: 'twitter:description', content: descriptionText });

    // Canonical
    this.meta.updateTag({ rel: 'canonical', href: `https://www.unlibroxsemana.com/categorias/${this.slug}` } as any);
  }
}