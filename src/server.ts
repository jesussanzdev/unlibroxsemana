import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Base endpoint for the Angular application.
 */
app.get('/api/ofertas', (req, res) => {
  const page = parseInt(req.query['page'] as string) || 1;
  const pageSize = 10;

  const totalPages = 400;

  if (page > totalPages) {
    return res.json({ items: [], hasMore: false });
  }

  const items = Array.from({ length: pageSize }).map((_, i) => ({
    title: `Libro ${i + 1 + (page - 1) * pageSize}`,
    price: `${10 + i} €`,
    image: `https://via.placeholder.com/150?text=Libro+${i + 1 + (page - 1) * pageSize}`,
    link: '#'
  }));

  return res.json({ items, hasMore: page < totalPages });
});


/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
