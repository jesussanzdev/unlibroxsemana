import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookPack } from '../../interfaces/book-pack.interface';

@Component({
  selector: 'app-packs',
  imports: [FormsModule],
  templateUrl: './packs.component.html',
  styleUrls: ['./packs.component.scss']
})
export class PacksComponent {

  packs: BookPack[] = [
    {
      id: 'aventurero',
      title: 'Aventurero Empedernido',
      description: 'Explora mundos mágicos llenos de aventuras.',
      books: [
        { asin: '1', title: 'El Hobbit', author: 'J. R. R. Tolkien', pages: 310, link: ''},
        { asin: '2', title: 'Harry Potter y la piedra filosofal', author: 'J. K. Rowling', pages: 340, link: ''},
        { asin: '3', title: 'Percy Jackson y el ladrón del rayo', author: 'Rick Riordan', pages: 375, link: ''}
      ]
    },
    {
      id: 'autoformacion',
      title: 'Autoformación Express',
      description: 'Mejora tu mente y hábitos en pocas páginas.',
      books: [
        { asin: '4', title: 'Inteligencia emocional', author: 'Daniel Goleman', pages: 300, link: '' },
        { asin: '5', title: 'Los 7 hábitos de la gente altamente efectiva', author: 'Stephen Covey', pages: 380, link: ''},
        { asin: '6', title: 'Atomic Habits', author: 'James Clear', pages: 350, link: ''}
      ]
    },
    {
      id: 'filosofia',
      title: 'Filosofía Ligera',
      description: 'Reflexiones profundas en un lenguaje sencillo.',
      books: [
        { asin: '7', title: 'El mundo de Sofía', author: 'Jostein Gaarder', pages: 400, link: ''},
        { asin: '8', title: 'Meditaciones', author: 'Marco Aurelio', pages: 180, link: ''},
        { asin: '9', title: 'El hombre en busca de sentido', author: 'Viktor Frankl', pages: 200, link: ''}
      ]
    },
    {
      id: 'misterio',
      title: 'Misterio y Café',
      description: 'Intriga y enigmas perfectos para leer con un café.',
      books: [
        { asin: '10', title: 'Asesinato en el Orient Express', author: 'Agatha Christie', pages: 256, link: ''},
        { asin: '11', title: 'El nombre de la rosa', author: 'Umberto Eco', pages: 450, link: ''},
        { asin: '12', title: 'La chica del tren', author: 'Paula Hawkins', pages: 395, link: ''}
      ]
    }
  ];

  selectedPack: BookPack | null = null;

  openPack(pack: BookPack) {
    this.selectedPack = pack;
  }

  closePack() {
    this.selectedPack = null;
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = '/assets/fallback-book.webp';
  }
}
