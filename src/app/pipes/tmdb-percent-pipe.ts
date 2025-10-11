import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'tmdbPercent', standalone: true })
export class TmdbPercentPipe implements PipeTransform {
  public transform(voteAverage: number | null | undefined): string {
    if (voteAverage == null) return '—';
    const percentage: number = Math.round(voteAverage * 10);
    return `${percentage}%`;
  }
}
