import { HomeComponent } from './pages/home/home.component';
import { BookResolver } from './shared/services/book.resolver';

export const routes = [
  { path: '', component: HomeComponent },
  { path: 'categorias/:slug', resolve: { books: BookResolver }, loadComponent: () => import('./pages/category/category.component').then(m => m.CategoryComponent) },
  { path: 'sobre-nosotros', loadComponent: () => import('./pages/information/information.component').then(m => m.InformationComponent) },
  { path: '**', redirectTo: '' }
];