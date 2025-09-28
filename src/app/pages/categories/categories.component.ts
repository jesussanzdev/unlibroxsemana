import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Category } from '../../shared/interfaces/category.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  imports: [RouterLink]
})
export class CategoriesComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  
categories: Category[] = [
  { 
    url: "/categorias/biografia", 
    name: "Biografía",
    description: "Descubre la vida de personajes célebres, autores influyentes y figuras históricas que marcaron su tiempo."
  },
  { 
    url: "/categorias/ciencia-ficcion", 
    name: "Ciencia ficción",
    description: "Viajes espaciales, futuros distópicos y realidades paralelas que expanden tu imaginación."
  },
  { 
    url: "/categorias/ensayo", 
    name: "Ensayo",
    description: "Reflexiones, ideas y análisis sobre temas variados, desde filosofía hasta actualidad."
  },
  { 
    url: "/categorias/fantasia", 
    name: "Fantasía",
    description: "Mundos mágicos, criaturas extraordinarias y aventuras épicas llenas de imaginación."
  },
  { 
    url: "/categorias/misterio", 
    name: "Misterio",
    description: "Intriga, suspense y enigmas que pondrán a prueba tu ingenio en cada página."
  },
  { 
    url: "/categorias/romance", 
    name: "Romance",
    description: "Historias de amor que emocionan, inspiran y conquistan al corazón."
  },
];

  ngOnInit() {
    this.setSeoTags();
  }

  private setSeoTags() {
    const titleText = `Libros cortos y adictivos en sección de Categorías - Un libro por semana`;
    const descriptionText = `Explora todas las categorías de libros en Un Libro por Semana. Descubre recomendaciones cuidadosamente seleccionadas para fomentar tu hábito de lectura.`;
    
    // Title y Meta
    this.title.setTitle(titleText);
    this.meta.updateTag({ name: 'description', content: descriptionText });
    this.meta.updateTag({ name: 'keywords', content: 'libros, categorías, lectura, recomendaciones, packs' });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: titleText });
    this.meta.updateTag({ property: 'og:description', content: descriptionText });
    this.meta.updateTag({ property: 'og:url', content: 'https://www.unlibroxsemana.com/categorias' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: titleText });
    this.meta.updateTag({ name: 'twitter:description', content: descriptionText });

    // Canonical
    this.meta.updateTag({ rel: 'canonical', href: 'https://www.unlibroxsemana.com/categorias' } as any);
  }
}