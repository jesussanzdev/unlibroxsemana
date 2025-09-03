import { ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Book } from '../../shared/interfaces/book.interface';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { take } from 'rxjs';
import { PacksComponent } from '../../shared/components/packs/packs.component';

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
        },
        error: () => this.loading.set(false)
      });
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = '/assets/fallback-book.webp';
  }

  private setMetaTags() {
    this.title.setTitle("Recomendaciones de Libros Cortos y Adictivos - Un libro por semana");
    this.meta.addTags([
      { name: 'description', content: 'Encuentra las mejores recomendaciones de libros cortos y adictivos en un solo lugar. Explora una amplia variedad de géneros y autores.' },
      { name: 'keywords', content: 'libros, recomendaciones, descuentos, lectura' }
    ]);
  }
}
