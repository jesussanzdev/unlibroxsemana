import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Data } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
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

  slug: string = '';
  books: any[] = [];
  private paramSub!: Subscription;

  ngOnInit() {
    this.paramSub = this.route.data.subscribe((data: Data) => {
      this.books = data['books'] || [];
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.slug = params.get('slug') || '';
      this.title.setTitle(`Libros cortos y adictivos en ${this.slug}`);
      this.meta.updateTag({
        name: 'description',
        content: `Descubre libros en la categoría ${this.slug} y fomenta tu hábito de lectura.`
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