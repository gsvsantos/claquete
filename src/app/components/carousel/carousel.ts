import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Media } from '../../models/media';
import { AsyncPipe } from '@angular/common';
import { HoverScroll } from '../../directives/hover-scroll';
import { MediaCard } from "../media-card/media-card";

@Component({
  selector: 'clqt-carousel',
  imports: [AsyncPipe, HoverScroll, MediaCard],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
})
export class Carousel {
  @Input() public medias$?: Observable<Media[]>;
  @ViewChild('carousel') public carouselRef!: ElementRef<HTMLDivElement>;

  public readonly scrollAmount = 300;
}
