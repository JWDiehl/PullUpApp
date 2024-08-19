import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'pullUpApp3App.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'user-profile',
    data: { pageTitle: 'pullUpApp3App.userProfile.home.title' },
    loadChildren: () => import('./user-profile/user-profile.routes'),
  },
  {
    path: 'basketball-court',
    data: { pageTitle: 'pullUpApp3App.basketballCourt.home.title' },
    loadChildren: () => import('./basketball-court/basketball-court.routes'),
  },
  {
    path: 'court-type',
    data: { pageTitle: 'pullUpApp3App.courtType.home.title' },
    loadChildren: () => import('./court-type/court-type.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
