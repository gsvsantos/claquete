import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { TMDBService } from '../services/tmdb.service';

export const tokenIsValidGuard: CanActivateFn = (): Observable<boolean> => {
  const tmdbService: TMDBService = inject(TMDBService);
  const router: Router = inject(Router);
  const toastrService: ToastrService = inject(ToastrService);

  return tmdbService.tokenAuthVerify$().pipe(
    tap((isValid: boolean) => {
      if (!isValid) {
        toastrService.error('Sua chave de API está inválida ou expirada');
        void router.navigate(['/401']);
      }
    }),
    map((isValid: boolean) => isValid),
    catchError(() => {
      toastrService.error('Falha ao validar a chave de API');
      void router.navigate(['/401']);
      return of(false);
    }),
  );
};
