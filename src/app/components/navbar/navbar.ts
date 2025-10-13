import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Search } from '../search/search';

@Component({
  selector: 'clqt-navbar',
  imports: [RouterLink, RouterLinkActive, Search],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {}
