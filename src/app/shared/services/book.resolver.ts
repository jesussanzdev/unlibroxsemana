import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookResolver implements Resolve<any> {
  constructor(private http: HttpClient) {}

  resolve(route: ActivatedRouteSnapshot) {
    const slug = route.params['slug'];
    const url = `/assets/data/${slug}.json`;

    return this.http.get(url).pipe(
      catchError(err => {
        console.error(`No se encontró la categoría: ${slug}`, err);
        return of([]);
      })
    );
  }
}