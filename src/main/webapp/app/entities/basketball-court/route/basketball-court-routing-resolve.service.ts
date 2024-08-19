import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IBasketballCourt } from '../basketball-court.model';
import { BasketballCourtService } from '../service/basketball-court.service';

const basketballCourtResolve = (route: ActivatedRouteSnapshot): Observable<null | IBasketballCourt> => {
  const id = route.params['id'];
  if (id) {
    return inject(BasketballCourtService)
      .find(id)
      .pipe(
        mergeMap((basketballCourt: HttpResponse<IBasketballCourt>) => {
          if (basketballCourt.body) {
            return of(basketballCourt.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default basketballCourtResolve;
