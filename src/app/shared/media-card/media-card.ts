import { Component, inject, Input, OnInit } from '@angular/core';
import { Media } from '../../models/media';
import { TmdbPercentPipe } from '../../pipes/tmdb-percent.pipe';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GsButtons, gsButtonTypeEnum, gsTabTargetEnum, gsVariant } from 'gs-buttons';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'clqt-media-card',
  imports: [TmdbPercentPipe, DatePipe, RouterLink, GsButtons],
  templateUrl: './media-card.html',
  styleUrl: './media-card.scss',
})
export class MediaCard implements OnInit {
  @Input({ required: true }) public media?: Media;
  public buttonType = gsButtonTypeEnum;
  public targetType = gsTabTargetEnum;
  public variantType = gsVariant;

  private readonly local = inject(LocalStorageService);

  public ngOnInit(): void {}

  public onToggleFavorite(media: Media): void {
    this.local.changeMediaStatus(media);
  }
}
