import { Component, inject } from '@angular/core';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs';
import { TMDBService } from '../../services/tmdb-service';
import { Carousel } from '../carousel/carousel';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MediaTypes } from '../../models/media';

@Component({
  selector: 'clqt-medias',
  imports: [Carousel, AsyncPipe],
  templateUrl: './medias.html',
  styleUrl: './medias.scss',
})
export class Medias {
  private readonly quantity = 12;
  private readonly route = inject(ActivatedRoute);
  private readonly tMDBService = inject(TMDBService);
  public mediaTypeStr?: string;

  public readonly mediaType$ = this.route.paramMap.pipe(
    map((params: ParamMap) => {
      const mediaType = params.get('mediaType');

      if (!mediaType) {
        throw new Error('deu ruim');
      }
      this.mediaTypeStr = mediaType;
      return mediaType as MediaTypes;
    }),
    filter((mediaType) => Object.values(MediaTypes).includes(mediaType)),
    distinctUntilChanged(),
  );

  public readonly popularMedias$ = this.mediaType$.pipe(
    switchMap((mediaType) =>
      this.tMDBService.getMediasByType(mediaType, 1, this.quantity, 'popular'),
    ),
  );
  public readonly topRatedMedias$ = this.mediaType$.pipe(
    switchMap((mediaType) =>
      this.tMDBService.getMediasByType(mediaType, 1, this.quantity, 'top_rated'),
    ),
  );
  public readonly upcomingMedias$ = this.mediaType$.pipe(
    switchMap((mediaType) =>
      this.tMDBService.getMediasByType(mediaType, 1, this.quantity, 'upcoming'),
    ),
  );
  public readonly nowPlayingMedias$ = this.mediaType$.pipe(
    switchMap((mediaType) =>
      this.tMDBService.getMediasByType(mediaType, 1, this.quantity, 'now_playing'),
    ),
  );
  public readonly airingTodayMedias$ = this.mediaType$.pipe(
    switchMap((mediaType) =>
      this.tMDBService.getMediasByType(mediaType, 1, this.quantity, 'airing_today'),
    ),
  );
  public readonly onTheAirMedias$ = this.mediaType$.pipe(
    switchMap((mediaType) =>
      this.tMDBService.getMediasByType(mediaType, 1, this.quantity, 'on_the_air'),
    ),
  );
}
