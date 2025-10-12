import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageSelector } from "../language-selector/language-selector";
import { Search } from '../search/search';

@Component({
  selector: 'clqt-navbar',
  imports: [RouterLink, RouterLinkActive, LanguageSelector, Search],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {}
