import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Media } from '../models/media';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly toastService = inject(ToastrService)
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
      this.favoritesMediaSubject.next(items);
    } catch {
      localStorage.removeItem(this.key);
    }
  }

  public changeMediaStatus(media: Media): void {
    const actualFavorites: Media[] = this.favoritesMediaSubject.getValue();
    const nextFavorites: Media[] = [...actualFavorites];

    if (media.favorite) {
      media.favorite = false;
      this.toastService.success('Removed from favorites');
      const index: number = nextFavorites.findIndex((_media) => _media.id === media.id);
      if (index > -1) nextFavorites.splice(index, 1);
    } else {
      media.favorite = true;
      this.toastService.success('Added to favorites');
      nextFavorites.push(media);
    }

    this.favoritesMediaSubject.next(nextFavorites);
    if (this.isBrowser) {
      localStorage.setItem(this.key, JSON.stringify(nextFavorites));
    }
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
    const normalizedFavorites: Media[] = updatedFavorites.map(
      (media: Media): Media => ({ ...media, favorite: true }),
    );

    this.favoritesMediaSubject.next(normalizedFavorites);
    if (this.isBrowser) {
      localStorage.setItem(this.key, JSON.stringify(normalizedFavorites));
    }
  }
}
