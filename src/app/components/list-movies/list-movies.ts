import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie';

@Component({
  selector: 'cqt-list-movies',
  imports: [AsyncPipe],
  templateUrl: './list-movies.html',
  styleUrl: './list-movies.scss',
})
export class ListMovies {
  @Input() public movies$?: Observable<Movie[]>;
}
