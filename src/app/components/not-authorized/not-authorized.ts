import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { GsButtons, gsButtonTypeEnum, gsTabTargetEnum, gsVariant } from 'gs-buttons';

@Component({
  selector: 'cqlt-not-authorized',
  imports: [GsButtons, TranslocoModule],
  templateUrl: './not-authorized.html',
  styleUrl: './not-authorized.scss',
})
export class NotAuthorized {
  public buttonType = gsButtonTypeEnum;
  public targetType = gsTabTargetEnum;
  public variantType = gsVariant;

  private readonly router: Router = inject(Router);

  public tryAgain(): void {
    void this.router.navigate(['/main-menu']);
  }
}
