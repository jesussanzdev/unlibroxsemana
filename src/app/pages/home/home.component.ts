import { Component, inject } from '@angular/core';
import { Book } from '../../shared/interfaces/book.interface';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  keyword = '';
  results: Book[] = [];

  http = inject(HttpClient);

  searchBooks(){
    if(!this.keyword) {
      this.results = [];
      return;
    }
    this.http.get<Book[]>(
        `/api/search?q=${encodeURIComponent(this.keyword)}`,
      ).subscribe({
      next: (data) => {
        this.results = data;
      },
      error: (err) => {
        console.error('Error fetching books:', err);
        this.results = [];
      }
    })
  }

}
