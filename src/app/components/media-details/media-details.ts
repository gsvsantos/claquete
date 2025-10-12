import { Component, inject } from '@angular/core';
import { combineLatest, distinctUntilChanged, filter, map, Observable, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TMDBService } from '../../services/tmdb-service';
import { MediaTypes, ThisMediaDetails } from '../../models/media';
import { AsyncPipe, DatePipe } from '@angular/common';
import { TmdbPercentPipe } from '../../pipes/tmdb-percent-pipe';
import { TMDBApiCast, TMDBApiCrew, TMDBApiVideo } from '../../models/tmdb-api';

@Component({
  selector: 'clqt-media-details',
  imports: [TmdbPercentPipe, DatePipe, AsyncPipe],
  templateUrl: './media-details.html',
  styleUrl: './media-details.scss',
})
export class MediaDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly tMDBService = inject(TMDBService);
  public readonly mediaType$ = this.route.paramMap.pipe(
    map((params) => params.get('mediaType') as MediaTypes | null),
    filter(
      (mediaType): mediaType is MediaTypes =>
        !!mediaType && Object.values(MediaTypes).includes(mediaType),
    ),
    distinctUntilChanged(),
  );

  public readonly mediaId$ = this.route.paramMap.pipe(
    map((params) => Number(params.get('id'))),
    filter((id): id is number => Number.isFinite(id)),
    distinctUntilChanged(),
  );

  public readonly mediaDetails$?: Observable<ThisMediaDetails> = combineLatest([
    this.mediaType$,
    this.mediaId$,
  ]).pipe(
    switchMap(([mediaType, mediaId]) => this.tMDBService.getMediaDetails(mediaType, mediaId)),
  );

  public readonly isMovie$: Observable<boolean> = this.mediaType$.pipe(
    map((mediaType) => mediaType === MediaTypes.Movie),
    distinctUntilChanged(),
  );

  public readonly topCast$: Observable<TMDBApiCast[]> = this.mediaDetails$!.pipe(
    map((mediaDetail) => (mediaDetail?.credits?.cast ?? []).slice(0, 8)),
  );

  public readonly mainCrew$: Observable<TMDBApiCrew[]> = this.mediaDetails$!.pipe(
    map((mediaDetail) =>
      (mediaDetail?.credits?.crew ?? [])
        .filter(
          (credits) =>
            credits.job === 'Director' ||
            credits.job === 'Writer' ||
            credits.department === 'Writing',
        )
        .slice(0, 6),
    ),
  );

  public readonly videosTrailerClip$: Observable<TMDBApiVideo[]> = this.mediaDetails$!.pipe(
    map((mediaDetail) =>
      (mediaDetail?.videos?.results ?? []).filter((video) => video.type === 'Trailer' || video.type === 'Clip'),
    ),
  );
}
