import { HomeComponent } from './pages/home/home.component';

export const routes = [
  { path: '', component: HomeComponent },
  { path: 'categorias/:slug', loadComponent: () => import('./pages/category/category.component').then(m => m.CategoryComponent) },
  { path: 'sobre-nosotros', loadComponent: () => import('./pages/information/information.component').then(m => m.InformationComponent) },
  { path: '**', redirectTo: '' }
];