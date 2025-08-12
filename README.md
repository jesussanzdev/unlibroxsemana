# librosexpress

> MVP para un catálogo / buscador minimalista de libros en oferta usando **Amazon Product Advertising API**, Angular SSR y generación de texto ligera por IA. Objetivo: MVP funcional sin costes de suscripción (solo pagar dominio).

---

## Resumen (breve)

Sitio web minimalista que muestre libros en oferta y enlaces de afiliado de Amazon, con Angular + Angular Universal para SSR (SEO), un backend Node.js/Express que consulte la Amazon Product Advertising API, y una IA ligera para limpiar títulos y generar descripciones SEO-friendly. La pantalla principal tendrá buscador + ofertas del día con scroll infinito y filtros básicos. También habrá menús o secciones con categorías específicas de libros, generadas de forma estática para SEO.

---

## 1) MVP técnico básico

**Front-end**

* Angular con Angular Universal (SSR).
* Scroll infinito y filtros básicos en la página principal.

**Backend ligero**

* Node.js + Express como proxy hacia la Amazon Product Advertising API.

**Base de datos**

* SQLite o JSON local para cache y ofertas destacadas.

**Hosting gratuito**

* Render, Vercel o Railway.

---

## 2) Amazon Product Advertising API

* Cuenta en Amazon Associates.
* Consultas por palabra clave, ofertas y categorías específicas.
* Obtener precio, imágenes y URL de afiliado.

---

## 3) IA sin coste

* Hugging Face Inference API (free tier) o modelos locales (Ollama con LLaMA 3 / Mistral).
* Funciones: normalizar títulos, crear descripciones únicas optimizadas para SEO.

---

## 4) Flujo simplificado

1. Usuario accede a la web.
2. Angular SSR solicita datos al backend.
3. Backend consulta la API de Amazon.
4. IA opcional procesa textos.
5. Backend envía HTML renderizado para SEO.
6. Enlaces de compra con tag de afiliado.

---

## 5) Coste

* Dominio: único gasto fijo.
* Hosting: Render / Vercel / Railway en plan gratuito.
* IA: gratuita vía Hugging Face o local.
* DB: gratuita.

---

## Interfaz y SEO

* Diseño minimalista, tipografía legible, imágenes grandes.
* Página principal: buscador + ofertas del día + scroll infinito.
* Páginas de categorías estáticas indexables.
* Schema.org `Product` y `Offer`.

---

## Arquitectura

```mermaid
flowchart LR
  A[Usuario - Navegador] -->|Request| B[Angular SSR]
  B --> C[Node/Express Backend]
  C --> D[Amazon Product Advertising API]
  D --> C
  C --> E[IA (Hugging Face / Local)]
  E --> C
  C --> F[SQLite / JSON]
  C --> B
  B --> A
```

---

## Roadmap corto

1. Búsqueda básica `/api/search?q=libro`.
2. SSR con resultados y meta tags.
3. Cache y cron job diario para ofertas destacadas.
4. IA para descripciones SEO.
5. Scroll infinito y filtros.
6. Categorías estáticas para SEO.

---