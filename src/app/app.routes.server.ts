import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'categorias/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => Promise.resolve([
      { slug: 'biografia' },
      { slug: 'ciencia-ficcion' },
      { slug: 'ensayo' },
      { slug: 'ficcion' },
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
