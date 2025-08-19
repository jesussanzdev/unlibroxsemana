import { Component, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-category',
  imports: [TitleCasePipe],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnDestroy {
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);

  slug: string = '';
  private paramSub!: Subscription;

  constructor() {}

  ngOnInit() {
    this.paramSub = this.route.paramMap.subscribe((params: ParamMap) => {
      this.slug = params.get('slug') || '';
      this.title.setTitle(`Ofertas de libros en ${this.slug} | Un libro a la semana`);
      this.meta.updateTag({
        name: 'description',
        content: `Descubre libros en oferta de la categoría ${this.slug} y fomenta tu hábito de lectura.`
      });
    });
  }

  ngOnDestroy() {
    this.paramSub.unsubscribe();
  }
}