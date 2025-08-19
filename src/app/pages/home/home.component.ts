import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Book } from '../../shared/interfaces/book.interface';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  
  page = 1;
  hasMore = true;
  http = inject(HttpClient);
  loading = signal(false);
  books = signal<Book[]>([]);

  private title = inject(Title);
  private meta = inject(Meta);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(){
    this.loadPage(this.page);
    this.loadMore();
    this.setMetaTags();
  }

  private loadPage(page: number) {
    this.loading.set(true);
        this.http.get<{ items: Book[], hasMore: boolean }>(`/api/ofertas?page=${page}`)
      .subscribe({
        next: res => {
          this.books.update(prev => [...prev, ...res.items]);
          this.hasMore = res.hasMore;
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      });

  }

  private loadMore() {
     if (isPlatformBrowser(this.platformId)) {
      const anchor = document.querySelector('#infiniteScrollAnchor');
      if (anchor) {
        const observer = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting && this.hasMore && !this.loading()) {
            this.page++;
            this.loadPage(this.page);
          }
        });
        observer.observe(anchor);
      }
    }
  }

  private setMetaTags() {
    this.title.setTitle("Ofertas de Libros - Un libro a la semana");
    this.meta.addTags([
      { name: 'description', content: 'Encuentra las mejores ofertas de libros en un solo lugar. Explora una amplia variedad de géneros y autores.' },
      { name: 'keywords', content: 'libros, ofertas, descuentos, lectura' }
    ]);
  }
}
