import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Media } from '../models/media';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly key: string = 'claquete:favorites';
  private readonly favoritesMediaSubject: BehaviorSubject<Media[]> = new BehaviorSubject<Media[]>(
    [],
  );

  public constructor() {
    const jsonString = localStorage.getItem(this.key);

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
      const index: number = nextFavorites.findIndex((_media) => _media.id === media.id);
      if (index > -1) nextFavorites.splice(index, 1);
    } else {
      media.favorite = true;
      nextFavorites.push(media);
    }

    this.favoritesMediaSubject.next(nextFavorites);
    localStorage.setItem(this.key, JSON.stringify(nextFavorites));
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
}
