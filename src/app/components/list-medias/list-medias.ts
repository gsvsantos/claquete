import { AsyncPipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { exhaustMap, filter, Observable, of, scan, startWith, Subject, switchMap, tap } from 'rxjs';
import { Media } from '../../models/media';
import { GsButtons, gsButtonTypeEnum, gsTabTargetEnum, gsVariant } from 'gs-buttons';
import { TMDBService } from '../../services/tmdb.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MediaCard } from '../media-card/media-card';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'clqt-list-medias',
  imports: [AsyncPipe, GsButtons, MediaCard, TranslocoModule],
  templateUrl: './list-medias.html',
  styleUrl: './list-medias.scss',
})
export class ListMedias implements OnInit {
  @Input({ required: true }) public medias$?: Observable<Media[]>;
  public mediaTypeStr?: string;
  public buttonType = gsButtonTypeEnum;
  public targetType = gsTabTargetEnum;
  public variantType = gsVariant;
  public get finalPageReached(): boolean {
    return this.pageIndex >= 520;
  }

  private pageIndex: number = 1;
  private readonly clickLoadMore$ = new Subject<void>();
  private readonly route = inject(ActivatedRoute);
  private readonly tMDBService = inject(TMDBService);

  public ngOnInit(): void {
    this.medias$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const mediaType = params.get('mediaType');
        const category = params.get('category');

        if (!mediaType) {
          return of([]);
        } else if (!category) {
          return of([]);
        }

        this.pageIndex = 1;
        this.mediaTypeStr = mediaType;
        const page$ = this.clickLoadMore$.pipe(
          startWith(void 1),
          filter(() => !this.finalPageReached),
          exhaustMap(() =>
            this.tMDBService
              .getMediasByType(mediaType, this.pageIndex, 18, category)
              .pipe(tap(() => (this.pageIndex += 1))),
          ),
        );

        return page$.pipe(
          scan((accumulated, newPage) => [...accumulated, ...newPage], [] as Media[]),
        );
      }),
    );
  }

  public loadMore(): void {
    if (this.finalPageReached) return;

    this.clickLoadMore$.next();
  }
}
