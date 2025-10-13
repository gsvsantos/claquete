import { Component, inject } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { Media } from '../../models/media';
import { LocalStorageService } from '../../services/local-storage.service';
import { AsyncPipe } from '@angular/common';
import { Carousel } from '../carousel/carousel';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-favorites',
  imports: [AsyncPipe, Carousel, TranslocoModule],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
})
export class Favorites {
  private readonly local = inject(LocalStorageService);

  public favoriteMedias$: Observable<Media[]> = this.local.getFavorites();

  public readonly favoritesByType$: Observable<{ movies: Media[]; tvShows: Media[] }> =
    this.favoriteMedias$.pipe(
      map((items: Media[]) => {
        const movies: Media[] = items
          .filter((media) => media.mediaType === 'movie')
          .sort((first, second) => first.id - second.id);

        const tvShows: Media[] = items
          .filter((media) => media.mediaType === 'tv')
          .sort((first, second) => first.id - second.id);

        return { movies, tvShows };
      }),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

  public readonly movies$: Observable<Media[]> = this.favoritesByType$.pipe(map((x) => x.movies));

  public readonly tvShows$: Observable<Media[]> = this.favoritesByType$.pipe(map((x) => x.tvShows));
}
