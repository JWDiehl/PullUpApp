import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { BasketballCourtComponent } from './list/basketball-court.component';
import { BasketballCourtDetailComponent } from './detail/basketball-court-detail.component';
import { BasketballCourtUpdateComponent } from './update/basketball-court-update.component';
import BasketballCourtResolve from './route/basketball-court-routing-resolve.service';

const basketballCourtRoute: Routes = [
  {
    path: '',
    component: BasketballCourtComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BasketballCourtDetailComponent,
    resolve: {
      basketballCourt: BasketballCourtResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BasketballCourtUpdateComponent,
    resolve: {
      basketballCourt: BasketballCourtResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BasketballCourtUpdateComponent,
    resolve: {
      basketballCourt: BasketballCourtResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default basketballCourtRoute;
