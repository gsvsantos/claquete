import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Media } from '../../models/media';
import { LocalStorageService } from '../../services/local-storage.service';
import { MediaCard } from '../media-card/media-card';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorites',
  imports: [AsyncPipe, MediaCard, RouterLink],
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
    );
}
