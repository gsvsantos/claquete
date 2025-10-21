import { TMDBApiSearchMultiResponse } from '../models/tmdb-api';

export function mapDataPagination(res: TMDBApiSearchMultiResponse): {
  actualPage: number;
  totalPages: number;
  pages: number[];
} {
  const actualPage = res.page;
  const totalPages = res.total_pages;

  const { start, end } = getPageWindow(actualPage, totalPages, 7);
  const paginas = getNumberOfPagesInArray(start, end);

  return { actualPage: actualPage, totalPages: totalPages, pages: paginas };
}

export function getPageWindow(
  actualPage: number,
  totalPages: number,
  maxPages: number,
): { start: number; end: number } {
  const maxSize = Math.max(1, Math.min(maxPages, totalPages));
  const radio = Math.floor(maxSize / 2);

  let start = Math.max(1, actualPage - radio);

  const end = Math.min(totalPages, start + maxSize - 1);
  start = Math.max(1, end - maxSize + 1);

  return { start, end };
}

export function getNumberOfPagesInArray(first: number, second: number): number[] {
  return Array.from({ length: second - first + 1 }, (___, i) => first + i);
}
