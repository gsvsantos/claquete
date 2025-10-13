import { Component } from '@angular/core';
import { LanguageSelector } from "../language-selector/language-selector";

@Component({
  selector: 'clqt-footer',
  imports: [LanguageSelector],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  public currentYear: number = new Date().getUTCFullYear();
}
