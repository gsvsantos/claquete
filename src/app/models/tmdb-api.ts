// Bases
export type TMDBImagePath = string | null;

export interface TMDBApiGenre {
  id: number;
  name: string;
}

export interface TMDBApiProductionCompany {
  id: number;
  logo_path: TMDBImagePath;
  name: string;
  origin_country: string;
}

export interface TMDBApiProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface TMDBApiSpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface TMDBApiBelongsToCollection {
  id: number;
  name: string;
  poster_path: TMDBImagePath;
  backdrop_path: TMDBImagePath;
}

// Videos
export interface TMDBApiVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface TMDBApiVideos {
  results: TMDBApiVideo[];
}

// Credits
export interface TMDBApiCast {
  adult: boolean;
  gender: 0 | 1 | 2;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: TMDBImagePath;
  cast_id?: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface TMDBApiCrew {
  adult: boolean;
  gender: 0 | 1 | 2;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: TMDBImagePath;
  credit_id: string;
  department: string;
  job: string;
}

export interface TMDBApiCredits {
  cast: TMDBApiCast[];
  crew: TMDBApiCrew[];
}

// TV_Show
export interface TMDBApiCreatedBy {
  id: number;
  credit_id: string;
  name: string;
  original_name: string;
  gender: 0 | 1 | 2;
  profile_path: TMDBImagePath;
}

export interface TMDBApiEpisode {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string | null; 
  episode_number: number;
  episode_type?: string;
  production_code: string | null; 
  runtime: number | null;
  season_number: number;
  show_id: number;
  still_path: TMDBImagePath;
}

export interface TMDBApiNetwork {
  id: number;
  logo_path: TMDBImagePath;
  name: string;
  origin_country: string;
}

export interface TMDBApiSeason {
  air_date: string | null;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: TMDBImagePath;
  season_number: number;
  vote_average: number;
}

// Medias List
export interface TMDBApiMediaListResponse {
  page: number;
  results: TMDBApiMediaListDetailsResponse[];
  total_pages?: number;
  total_results?: number;
}

export interface TMDBApiMediaListDetailsResponse {
  adult: boolean;
  backdrop_path: TMDBImagePath;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  popularity: number;
  poster_path: TMDBImagePath;
  release_date?: string | null;
  first_air_date?: string | null;
  title?: string;
  name?: string;
  video?: boolean;
  vote_average: number;
}

// Movie & TV Show
export interface TMDBApiMediaDetailsResponse {
  adult: boolean;
  backdrop_path: TMDBImagePath;
  genres: TMDBApiGenre[];
  homepage: string | null;
  id: number;
  origin_country?: string[];
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: TMDBImagePath;
  production_companies: TMDBApiProductionCompany[];
  production_countries: TMDBApiProductionCountry[];
  spoken_languages: TMDBApiSpokenLanguage[];
  status: string;
  tagline: string | null;
  vote_average: number;
  vote_count: number;

  // Movie-only
  belongs_to_collection?: TMDBApiBelongsToCollection | null;
  budget?: number;
  imdb_id?: string | null;
  original_title?: string;
  release_date?: string | null; 
  revenue?: number;
  runtime?: number | null;
  title?: string;
  video?: boolean;

  // TV_Show-only
  created_by?: TMDBApiCreatedBy[];
  episode_run_time?: number[];
  first_air_date?: string | null; 
  in_production?: boolean;
  languages?: string[];
  last_air_date?: string | null;
  last_episode_to_air?: TMDBApiEpisode | null;
  next_episode_to_air?: TMDBApiEpisode | null;
  networks?: TMDBApiNetwork[];
  number_of_episodes?: number;
  number_of_seasons?: number;
  original_name?: string;
  seasons?: TMDBApiSeason[];
  type?: string;
  name?: string;

  // Appendables
  videos?: TMDBApiVideos;
  credits?: TMDBApiCredits;
}
