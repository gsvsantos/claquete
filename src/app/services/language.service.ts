import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type TmdbLanguageCode = `${string}-${string}`;

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly storageKey: string = 'tmdb.language';
  private readonly currentLanguageSubject: BehaviorSubject<TmdbLanguageCode> =
    new BehaviorSubject<TmdbLanguageCode>(this.loadInitialLanguage());

  public readonly currentLanguage$: Observable<TmdbLanguageCode> =
    this.currentLanguageSubject.asObservable();

  public getCurrentLanguage(): TmdbLanguageCode {
    return this.currentLanguageSubject.value;
  }

  public setCurrentLanguage(newLanguageCode: TmdbLanguageCode): void {
    if (!/^[a-z]{2}-[A-Z]{2}$/.test(newLanguageCode)) {
      throw new Error(`Invalid language: ${newLanguageCode}`);
    }
    localStorage.setItem(this.storageKey, newLanguageCode);
    this.currentLanguageSubject.next(newLanguageCode);
  }

  private loadInitialLanguage(): TmdbLanguageCode {
    const saved = localStorage.getItem(this.storageKey) as TmdbLanguageCode | null;
    return saved ?? 'en-US';
  }
}
