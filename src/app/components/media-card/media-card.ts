import { Component, Input } from '@angular/core';
import { Media } from '../../models/media';
import { TmdbPercentPipe } from '../../pipes/tmdb-percent-pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'clqt-media-card',
  imports: [TmdbPercentPipe, DatePipe],
  templateUrl: './media-card.html',
  styleUrl: './media-card.scss',
})
export class MediaCard {
  @Input({ required: true }) public media?: Media;
}
