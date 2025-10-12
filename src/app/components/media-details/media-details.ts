import { Component, inject } from '@angular/core';
import { combineLatest, distinctUntilChanged, filter, map, Observable, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TMDBService } from '../../services/tmdb.service';
import { MediaTypes, ThisMediaDetails } from '../../models/media';
import { AsyncPipe, DatePipe } from '@angular/common';
import { TmdbPercentPipe } from '../../pipes/tmdb-percent.pipe';
import { TMDBApiCast, TMDBApiCrew, TMDBApiVideo } from '../../models/tmdb-api';
import { LocalStorageService } from '../../services/local-storage.service';
import { gsButtonTypeEnum, gsVariant, GsButtons } from 'gs-buttons';

@Component({
  selector: 'clqt-media-details',
  imports: [TmdbPercentPipe, DatePipe, AsyncPipe, GsButtons],
  templateUrl: './media-details.html',
  styleUrl: './media-details.scss',
})
export class MediaDetails {
  public readonly buttonTypes = gsButtonTypeEnum;
  public readonly variantTypes = gsVariant;

  private readonly route = inject(ActivatedRoute);
  private readonly tMDBService = inject(TMDBService);
  private readonly local = inject(LocalStorageService);
  public readonly mediaType$ = this.route.paramMap.pipe(
    distinctUntilChanged(),
    map((params) => params.get('mediaType') as MediaTypes | null),
    filter(
      (mediaType): mediaType is MediaTypes =>
        !!mediaType && Object.values(MediaTypes).includes(mediaType),
    ),
  );

  public readonly mediaId$ = this.route.paramMap.pipe(
    distinctUntilChanged(),
    map((params) => Number(params.get('id'))),
    filter((id): id is number => Number.isFinite(id)),
  );

  public readonly mediaDetails$?: Observable<ThisMediaDetails> = combineLatest([
    this.mediaType$,
    this.mediaId$,
  ]).pipe(
    switchMap(([mediaType, mediaId]) => this.tMDBService.getMediaDetailsByID(mediaType, mediaId)),
    map((details: ThisMediaDetails) => {
      const isFav: boolean = this.local
        .getFavoritesSnapshot()
        .some((media) => media.id === details.id);
      details.favorite = isFav;
      return details;
    }),
  );

  public readonly isMovie$: Observable<boolean> = this.mediaType$.pipe(
    distinctUntilChanged(),
    map((mediaType) => mediaType === MediaTypes.Movie),
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
      (mediaDetail?.videos?.results ?? []).filter(
        (video) => video.type === 'Trailer' || video.type === 'Clip',
      ),
    ),
  );

  public onToggleFavorite(media: ThisMediaDetails): void {
    this.local.changeMediaStatus(media);
  }
}
