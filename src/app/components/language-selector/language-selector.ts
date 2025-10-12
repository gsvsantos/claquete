import { Component, inject } from '@angular/core';
import { LanguageService, TmdbLanguageCode } from '../../services/language.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'clqt-language-selector',
  imports: [CommonModule, FormsModule],
  templateUrl: './language-selector.html',
  styleUrl: './language-selector.scss',
  standalone: true,
})
export class LanguageSelector {
  private readonly languageService = inject(LanguageService);

  public readonly availableLanguages: AvailableLanguage[] = [
    { code: 'en-US', label: 'English (US)' },
    { code: 'pt-BR', label: 'Português (Brasil)' },
    { code: 'es-ES', label: 'Español (España)' },
  ];

  public currentLanguage: TmdbLanguageCode = this.languageService.getCurrentLanguage();

  public onLanguageChange(newLanguageCode: TmdbLanguageCode): void {
    if (newLanguageCode !== this.currentLanguage) {
      this.currentLanguage = newLanguageCode;
      this.languageService.setCurrentLanguage(newLanguageCode);
      window.location.reload();
    }
  }
}

interface AvailableLanguage {
  code: TmdbLanguageCode;
  label: string;
}
