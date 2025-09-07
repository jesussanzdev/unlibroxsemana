import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'categorias',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'categorias/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => Promise.resolve([
      { slug: 'biografia' },
      { slug: 'ciencia-ficcion' },
      { slug: 'ensayo' },
      { slug: 'fantasia' },
      { slug: 'misterio' },
      { slug: 'romance' }
    ])
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
