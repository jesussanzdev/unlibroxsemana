import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-information',
  imports: [],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss'
})
export class InformationComponent {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit() {
    this.setSeoTags();
  }

  /** Función separada para SEO */
  private setSeoTags() {
    const titleText = `Sobre nosotros y políticas - Un libro por semana`;
    const descriptionText = `Conoce nuestra filosofía, políticas y afiliados, y aprende a sacar el máximo provecho de nuestras recomendaciones de libros cortos y adictivos.`;

    // Title y Meta
    this.title.setTitle(titleText);
    this.meta.updateTag({ name: 'description', content: descriptionText });
    this.meta.updateTag({ name: 'keywords', content: 'sobre nosotros, política, afiliados, libros, recomendaciones' });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: titleText });
    this.meta.updateTag({ property: 'og:description', content: descriptionText });
    this.meta.updateTag({ property: 'og:url', content: 'https://unlibroxsemana.com/sobre-nosotros' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: titleText });
    this.meta.updateTag({ name: 'twitter:description', content: descriptionText });

    // Canonical
    this.meta.updateTag({ rel: 'canonical', href: 'https://unlibroxsemana.com/sobre-nosotros' } as any);
  }
}
