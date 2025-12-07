import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

const adminRoutes:Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./admin/components/admin-homepage/admin-homepage').then(m => m.AdminHomepage),
  },
  {
    path: 'wish/add',
    loadComponent: () =>
      import('./admin/components/admin-wish-form/admin-wish-form').then(m => m.AdminWishForm),
  },
  {
    path: 'config',
    loadComponent: () =>
      import('./admin/components/config-page/config-page').then(m => m.ConfigPage),
  },
  {
    path: 'wish/edit/:id',
    loadComponent: () =>
      import('./admin/components/admin-wish-form/admin-wish-form').then(m => m.AdminWishForm),
  }
];

export const routes: Routes = [

  {
    loadComponent: () =>
      import('./installation/components/install-page/install-page').then(m => m.InstallPage),
    path: 'installation',
  },
  {
    loadComponent: () =>
      import('./public/components/home-page/home-page').then(m => m.HomePage),
    path: '',
  },
  {
    loadComponent: () =>
      import('./login/components/login-page/login-page').then(m => m.LoginPage),
    path: 'login',
  },
  {
    loadComponent: () =>
      import('./admin/components/admin-root/admin-root').then(m => m.AdminRoot),
    children: adminRoutes,
    canActivate: [AuthGuard],
    path: 'admin',
  }

];
