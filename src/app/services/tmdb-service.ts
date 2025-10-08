import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl: string = 'https://api.themoviedb.org/3/movie';

  public selectPopularMovies(): Observable<unknown> {
    const popularUrl = `${this.baseUrl}/popular?langague=pt-BR`;

    return this.http.get(popularUrl, {
      headers: { Authorization: environment.apiKey },
    });
  }
}
