import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Media } from '../../models/media';
import { TMDBService } from '../../services/tmdb.service';
import { Carousel } from '../../shared/carousel/carousel';
import { TranslocoModule } from '@jsverse/transloco';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'clqt-main-menu',
  imports: [Carousel, TranslocoModule, RouterLink],
  templateUrl: './main-menu.html',
  styleUrl: './main-menu.scss',
})
export class MainMenu {
  public popularMovies$?: Observable<Media[]>;
  public popularTVShows$?: Observable<Media[]>;

  private readonly quantity = 12;
  private readonly tMDBService = inject(TMDBService);

  public ngOnInit(): void {
    this.popularMovies$ = this.tMDBService.getMediasByType('movie', 1, this.quantity, 'popular');
    this.popularTVShows$ = this.tMDBService.getMediasByType('tv', 1, this.quantity, 'popular')
  }
}
