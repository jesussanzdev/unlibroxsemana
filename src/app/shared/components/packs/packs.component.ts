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
      title: 'Aventurero/a Junior',
      image: './assets/packs/adventure-pack.jpg',
      shortDescription: 'Explora mundos mágicos llenos de aventuras.',
      description: 'Este pack es ideal para quienes quieren adentrarse poco a poco en aventuras de fantasía y emoción. Empezamos con Coraline de Neil Gaiman, una historia ligera pero cargada de misterio y tintes de terror que engancha desde la primera página. Continuamos con La princesa prometida de William Goldman, un clásico atemporal que combina romance, humor y acción en una aventura inolvidable. Y para culminar, nos adentramos en la Tierra Media con El Hobbit de J. R. R. Tolkien, una obra imprescindible para cualquier amante de la fantasía. Tres viajes únicos que despertarán tu imaginación.',
      books: [
        { asin: '1', title: 'Coraline', author: 'Neil Gaiman', pages: 160, image: 'https://m.media-amazon.com/images/I/81lU6I-SGDL._SL1299_.jpg', link: 'https://amzn.to/46arie6'},
        { asin: '2', title: 'La princesa prometida', author: 'William Goldman', pages: 392, image: 'https://m.media-amazon.com/images/I/81pBBnwMY7L._SL1500_.jpg', link: 'https://amzn.to/3V4nBS8'},
        { asin: '3', title: 'El Hobbit', author: 'J. R. R. Tolkien', pages: 448, image: 'https://m.media-amazon.com/images/I/719FLxLw9DL._SL1050_.jpg', link: 'https://amzn.to/4pcxfQw'}
      ]
    },
    {
      id: 'autoformacion',
      title: 'Autoformación y Desarrollo Personal',
      image: './assets/packs/growth-pack.jpg',
      shortDescription: 'Mejora tu mente y hábitos en pocas páginas.',
      description: 'Mejora tu mente y tus hábitos en menos tiempo del que imaginas. Este pack reúne lecturas transformadoras que combinan reflexión y consejos prácticos para aplicar de inmediato. Empezamos con La supervivencia de los más ricos de Douglas Rushkoff, un libro que cuestiona el poder y la tecnología en la sociedad actual. Seguimos con El monje que vendió su Ferrari de Robin Sharma, una fábula inspiradora y de lectura ágil que ofrece claves para alcanzar el equilibrio personal y profesional. Finalmente, Hábitos atómicos de James Clear cierra el pack con una guía práctica para transformar tu vida a través de pequeños cambios que generan un gran impacto. Una trilogía perfecta para crecer y evolucionar sin excusas.',
      books: [
        { asin: '4', title: 'La supervivencia de los más ricos', author: 'Douglas Rushkoff', pages: 232, image: 'https://m.media-amazon.com/images/I/61VmkxofzSL._SL1200_.jpg', link: 'https://amzn.to/4ghS6Oq' },
        { asin: '5', title: 'El monje que vendió su Ferrari', author: 'Robin Sharma', pages: 224, image: 'https://m.media-amazon.com/images/I/81KbajSAThL._SL1500_.jpg', link: 'https://amzn.to/4mQQ8qx'},
        { asin: '6', title: 'Hábitos atómicos', author: 'James Clear', pages: 336, image: 'https://m.media-amazon.com/images/I/511yAViZiZL._SL1190_.jpg', link: 'https://amzn.to/4pgWqBE'}
      ]
    },
    {
      id: 'misterio',
      title: 'Máster Express en Criminología',
      image: './assets/packs/criminology-pack.jpg',
      shortDescription: 'Intriga y enigmas perfectos para leer con un café.',
      description: 'El compañero perfecto para esas tardes tranquilas con una taza de café y un buen libro en mano. Este pack está hecho para los amantes de las tramas inteligentes y los giros inesperados. Empezamos con la maestra del crimen, Agatha Christie, y su clásico Asesinato en el Orient Express, un rompecabezas lleno de sospechosos y deducciones brillantes. Continuamos con otra de sus obras maestras, Y no quedó ninguno, una historia cargada de tensión en la que diez desconocidos son atrapados en una isla con un asesino oculto entre ellos. Para cerrar, La chica del tren de Paula Hawkins aporta un toque contemporáneo, con una narrativa psicológica inquietante y secretos que se revelan poco a poco. Tres dosis de intriga diseñadas para mantenerte enganchado hasta la última página.',
      books: [
        { asin: '10', title: 'Asesinato en el Orient Express', author: 'Agatha Christie', pages: 248, image: 'https://m.media-amazon.com/images/I/61e93meepPL._SL1050_.jpg', link: 'https://amzn.to/45SkIdl'},
        { asin: '11', title: 'Y no quedó ninguno', author: 'Agatha Christie', pages: 256, image: 'https://m.media-amazon.com/images/I/61jYTE5MZHL._SL1050_.jpg', link: 'https://amzn.to/4gbMEfP'},
        { asin: '12', title: 'La chica del tren', author: 'Paula Hawkins', pages: 496, image: 'https://m.media-amazon.com/images/I/51MUfctwKNL._SL1050_.jpg', link: 'https://amzn.to/45T6sBd'}
      ]
    },
    {
      id: 'outsiders',
      title: 'Rebeldes con Causa',
      image: './assets/packs/rebel-pack.jpg',
      shortDescription: 'Historias para inconformistas y pensadores críticos.',
      description: 'Un pack diseñado para quienes nunca encajan en los moldes y buscan lecturas que cuestionen el mundo tal como lo conocemos. Empezamos con El guardián entre el centeno de J. D. Salinger, la voz de Holden Caulfield que se convirtió en símbolo de la rebeldía adolescente y la alienación. Continuamos con 1984 de George Orwell, la distopía por excelencia que desnuda los peligros del control absoluto y la manipulación social, una lectura imprescindible para quienes no temen mirar de frente a la verdad. Finalmente, cerramos con Las ventajas de ser un marginado de Stephen Chbosky, una novela íntima, emotiva y un poco más optimista sobre crecer, sentirse diferente y encontrar nuestro lugar en el mundo. Tres obras que invitan a pensar, cuestionar y, sobre todo, ser uno mismo.',
      books: [
        { asin: '20', title: 'El guardián entre el centeno', author: 'J. D. Salinger', pages: 288, image: 'https://m.media-amazon.com/images/I/61fwcnFmmpL._SL1080_.jpg', link: 'https://amzn.to/4pbsExP'},
        { asin: '21', title: '1984', author: 'George Orwell', pages: 352, image: 'https://m.media-amazon.com/images/I/71sOSrd+JxL._SL1500_.jpg', link: 'https://amzn.to/47C8dnH'},
        { asin: '22', title: 'Las ventajas de ser un marginado', author: 'Stephen Chbosky', pages: 264, image: 'https://m.media-amazon.com/images/I/91zFI86fTdL._SL1500_.jpg', link: 'https://amzn.to/4m5Hwv5'}
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
