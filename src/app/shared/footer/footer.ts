import { Component } from '@angular/core';
import { LanguageSelector } from "../language-selector/language-selector";
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'clqt-footer',
  imports: [LanguageSelector, TranslocoModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  public currentYear: number = new Date().getUTCFullYear();
}
