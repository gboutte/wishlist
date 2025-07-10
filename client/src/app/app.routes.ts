import { Routes } from '@angular/router';

const adminRoutes:Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./admin/components/admin-homepage/admin-homepage').then(m => m.AdminHomepage),
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
    path: 'admin',
  }

];
