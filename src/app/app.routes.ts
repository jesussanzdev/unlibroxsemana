import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '',
    loadComponent: () => import('./pages/home/home.component')
      .then(m => m.HomeComponent)
  },
  {
    path: 'categorias',
    loadComponent: () => import('./pages/categories/categories.component')
      .then(m => m.CategoriesComponent)
  },
  {
    path: 'categorias/:slug',
    loadComponent: () => import('./pages/category/category.component')
      .then(m => m.CategoryComponent)
  },
  {
    path: 'sobre-nosotros',
    loadComponent: () => import('./pages/information/information.component')
      .then(m => m.InformationComponent)
  },
  { path: '**', redirectTo: '' }
];
