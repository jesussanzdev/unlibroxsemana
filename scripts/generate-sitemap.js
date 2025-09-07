const fs = require('fs');
const path = require('path');
const xmlbuilder = require('xmlbuilder');

const routes = [
  "/",
  "/categorias",
  "/categorias/biografia",
  "/categorias/ciencia-ficcion",
  "/categorias/ensayo",
  "/categorias/fantasia",
  "/categorias/misterio",
  "/categorias/romance"
];

const root = xmlbuilder.create('urlset', { version: '1.0', encoding: 'UTF-8' });
root.att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');

routes.forEach(route => {
  const url = root.ele('url');
  url.ele('loc', `https://unlibroxsemana.com${route}`);
  url.ele('lastmod', new Date().toISOString());
  url.ele('changefreq', 'weekly');
  url.ele('priority', route === '/' ? '1.0' : '0.8');
});

const sitemapPath = path.join(__dirname, '../src/assets/sitemap.xml');
fs.writeFileSync(sitemapPath, root.end({ pretty: true }));

console.log('✅ Sitemap generado en src/assets/sitemap.xml');