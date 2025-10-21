import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Media } from '../models/media';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly toastService = inject(ToastrService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser: boolean = isPlatformBrowser(this.platformId);

  private readonly key: string = 'claquete:favorites';
  private readonly favoritesMediaSubject: BehaviorSubject<Media[]> = new BehaviorSubject<Media[]>(
    [],
  );

  public constructor() {
    if (!this.isBrowser) return;

    const jsonString: string | null = localStorage.getItem(this.key);
    if (!jsonString) return;

    try {
      const items: Media[] = JSON.parse(jsonString) as Media[];
      const seenKeys = new Set<string>();
      const normalized: Media[] = items
        .map((item: Media): Media => ({ ...item, favorite: true }))
        .filter((item: Media): boolean => {
          const key = `${item.media_type}:${item.id}`;
          if (seenKeys.has(key)) return false;
          seenKeys.add(key);
          return true;
        });

      this.favoritesMediaSubject.next(normalized);
      localStorage.setItem(this.key, JSON.stringify(normalized));
    } catch {
      localStorage.removeItem(this.key);
    }
  }

  public changeMediaStatus(media: Media): void {
    const actualFavorites: Media[] = this.favoritesMediaSubject.getValue();
    const isSameEntry = (media2: Media): boolean =>
      media.id === media2.id && media.media_type === media2.media_type;

    if (media.favorite) {
      media.favorite = false;
      this.toastService.success('Removed from favorites');

      const nextFavorites: Media[] = actualFavorites.filter((media: Media) => !isSameEntry(media));

      this.favoritesMediaSubject.next(nextFavorites);
      if (this.isBrowser) localStorage.setItem(this.key, JSON.stringify(nextFavorites));
      return;
    }

    media.favorite = true;
    this.toastService.success('Added to favorites');

    const alreadyExists: boolean = actualFavorites.some(isSameEntry);
    const normalizedMedia: Media = { ...media, favorite: true };

    const nextFavorites: Media[] = alreadyExists
      ? actualFavorites.map((media: Media) =>
          isSameEntry(media) ? { ...media, ...normalizedMedia } : media,
        )
      : [...actualFavorites, normalizedMedia];

    this.favoritesMediaSubject.next(nextFavorites);
    if (this.isBrowser) localStorage.setItem(this.key, JSON.stringify(nextFavorites));
  }

  public getFavorites(): Observable<Media[]> {
    return this.favoritesMediaSubject
      .asObservable()
      .pipe(
        map((favorites: Media[]) => [...favorites].sort((first, second) => first.id - second.id)),
      );
  }

  public getFavoritesSnapshot(): Media[] {
    return this.favoritesMediaSubject.getValue();
  }

  public setFavorites(updatedFavorites: Media[]): void {
    const seenKeys = new Set<string>();
    const normalizedFavorites: Media[] = updatedFavorites
      .map((item: Media): Media => ({ ...item, favorite: true }))
      .filter((item: Media): boolean => {
        const key = `${item.media_type}:${item.id}`;
        if (seenKeys.has(key)) return false;
        seenKeys.add(key);
        return true;
      });

    this.favoritesMediaSubject.next(normalizedFavorites);
    if (this.isBrowser) localStorage.setItem(this.key, JSON.stringify(normalizedFavorites));
  }
}
