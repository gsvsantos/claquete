import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Search } from '../search/search';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'clqt-navbar',
  imports: [RouterLink, RouterLinkActive, Search, TranslocoModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private readonly router = inject(Router);

  public search(query: string): void {
    void this.router.navigate(['/search'], { queryParams: { query } });
  }
}
