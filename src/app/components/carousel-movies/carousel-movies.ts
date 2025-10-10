import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie';
import { AsyncPipe } from '@angular/common';
import { HoverScroll } from '../../directives/hover-scroll';

@Component({
  selector: 'clqt-carousel-movies',
  imports: [AsyncPipe, HoverScroll],
  templateUrl: './carousel-movies.html',
  styleUrl: './carousel-movies.scss',
})
export class CarouselMovies {
  @Input() public movies$?: Observable<Movie[]>;
  @ViewChild('carousel') public carouselRef!: ElementRef<HTMLDivElement>;

  public readonly scrollAmount = 300;
}
