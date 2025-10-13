import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GsButtons, gsButtonTypeEnum, gsTabTargetEnum, gsVariant } from 'gs-buttons';

@Component({
  selector: 'cqlt-not-found',
  imports: [GsButtons],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound {
  public buttonType = gsButtonTypeEnum;
  public targetType = gsTabTargetEnum;
  public variantType = gsVariant;

  private readonly router: Router = inject(Router);

  public tryAgain(): void {
    void this.router.navigate(['/main-menu']);
  }
}
