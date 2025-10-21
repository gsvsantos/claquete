import { Component, inject } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { Media } from '../../models/media';
import { LocalStorageService } from '../../services/local-storage.service';
import { AsyncPipe } from '@angular/common';
import { Carousel } from '../../shared/carousel/carousel';
import { TranslocoModule } from '@jsverse/transloco';
import { MediaCard } from '../../shared/media-card/media-card';

@Component({
  selector: 'app-favorites',
  imports: [AsyncPipe, Carousel, TranslocoModule, MediaCard],
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
          .filter((media) => media.media_type === 'movie')
          .sort((first, second) => first.id - second.id);

        const tvShows: Media[] = items
          .filter((media) => media.media_type === 'tv')
          .sort((first, second) => first.id - second.id);

        return { movies, tvShows };
      }),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

  public readonly movies$: Observable<Media[]> = this.favoritesByType$.pipe(map((x) => x.movies));

  public readonly tvShows$: Observable<Media[]> = this.favoritesByType$.pipe(map((x) => x.tvShows));
}
