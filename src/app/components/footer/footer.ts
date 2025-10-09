import { Component } from '@angular/core';

@Component({
  selector: 'clqt-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  public currentYear: number = new Date().getUTCFullYear();
}
