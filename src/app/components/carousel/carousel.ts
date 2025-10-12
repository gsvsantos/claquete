import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Media } from '../../models/media';
import { AsyncPipe } from '@angular/common';
import { HoverScroll } from '../../directives/hover-scroll';
import { MediaCard } from "../media-card/media-card";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'clqt-carousel',
  imports: [AsyncPipe, HoverScroll, MediaCard, RouterLink],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
})
export class Carousel {
  @Input({ required: true }) public medias$?: Observable<Media[]>;
  @Input({ required: true }) public mediaType?: string;
  @ViewChild('carousel') public carouselRef!: ElementRef<HTMLDivElement>;

  public readonly scrollAmount = 300;
}
