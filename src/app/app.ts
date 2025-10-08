import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TmdbService } from './services/tmdb-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  public readonly tmdbService = inject(TmdbService)

  public ngOnInit(): void {
    this.tmdbService.selectPopularMovies().subscribe((test) => console.log(test));
  }
}
