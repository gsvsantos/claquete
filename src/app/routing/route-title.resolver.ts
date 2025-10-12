import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ListPageTitleResolver implements Resolve<string> {
  public resolve(route: ActivatedRouteSnapshot): string {
    const routePathPattern: string = route.routeConfig?.path ?? '';
    const mediaTypeParameter: string | null = route.paramMap.get('mediaType');
    const categoryParameter: string | null = route.paramMap.get('category');

    const mediaTypeLabel: string = mediaTypeParameter === 'tv' ? 'TV Shows' : 'Movies';

    if (routePathPattern === ':mediaType/all') {
      return `${mediaTypeLabel} — All Categories`;
    }
    if (routePathPattern === ':mediaType/:category') {
      const categoryLabel: string = (categoryParameter ?? 'Category')
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (category) => category.toUpperCase());
      return `${mediaTypeLabel} — ${categoryLabel}`;
    }
    return 'CLQT';
  }
}
