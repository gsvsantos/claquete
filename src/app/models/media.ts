import { TMDBImagePath, TMDBApiGenre, TMDBApiBelongsToCollection, TMDBApiVideos, TMDBApiCredits } from './tmdb-api';

export enum MediaTypes {
  Movie = 'movie',
  TV = 'tv',
}

export interface Media {
  mediaType: string;
  routerLink: string[];
  favorite: boolean;
  id: number;
  title?: string;
  name?: string;
  poster_path: TMDBImagePath;
  release_date?: string | null;
  first_air_date?: string | null;
  vote_average: number;
  overview: string;
}

export interface ThisMediaDetails extends Media {
  vote_count: number;
  backdrop_path: TMDBImagePath;
  genres: TMDBApiGenre[];
  status: string;
  tagline: string | null;
  runtime?: number | null;
  episode_run_time?: number[];
  number_of_seasons?: number;
  number_of_episodes?: number;
  belongs_to_collection?: TMDBApiBelongsToCollection | null;
  videos?: TMDBApiVideos;
  credits?: TMDBApiCredits;
  seasons?: MediaSeasonSummary[];
}

export interface MediaCredits {
  cast: MediaCastMember[];
  crew: MediaCrewMember[];
}

export interface MediaCastMember {
  id: number;
  name: string;
  character: string;
  profile_path: TMDBImagePath;
  order: number;
}

export interface MediaCrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: TMDBImagePath;
}

export interface MediaSeasonSummary {
  id: number;
  season_number: number;
  name: string;
  episode_count: number;
  air_date: string | null;
  poster_path: TMDBImagePath;
}
