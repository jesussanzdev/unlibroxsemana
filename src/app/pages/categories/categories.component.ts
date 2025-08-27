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
    this.title.setTitle(`Libros cortos y adictivos en sección de Categorías`);
    this.meta.updateTag({
      name: 'description',
      content: `Descubre libros en la sección de categorías de Un Libro por semana y fomenta tu hábito de lectura.`
    });
  }
}