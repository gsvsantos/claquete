export interface Media {
  title?: string;
  name?: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  overview: string;
}

export enum MediaTypes {
  Movie = 'movie',
  TV = 'tv',
}
