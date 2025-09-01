import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Data } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription, switchMap } from 'rxjs';
import { TitleCasePipe } from '@angular/common';
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

  slug: string = '';
  books: Book[] = [];
  private paramSub!: Subscription;

  ngOnInit() {
    this.paramSub = this.route.paramMap.subscribe((params: ParamMap) => {
      this.slug = params.get('slug') || '';

      this.title.setTitle(`Libros cortos y adictivos en ${this.slug}`);
      this.meta.updateTag({
        name: 'description',
        content: `Descubre libros en la categoría ${this.slug} y fomenta tu hábito de lectura.`,
      });

      this.http
        .get<Book[]>(`/assets/data/${this.slug}.json`)
        .subscribe((books) => {
          this.books = books || [];
          this.cdr.detectChanges();
        });
    });
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = '/assets/fallback-book.webp';
  }

  ngOnDestroy() {
    this.paramSub.unsubscribe();
  }
}