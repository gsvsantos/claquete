import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Search } from '../search/search';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'clqt-navbar',
  imports: [RouterLink, RouterLinkActive, Search, TranslocoModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {}
