import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'licenses',
    loadComponent: () => import('./pages/licenses/licenses.component'),
  },
  {
    path: 'terms_conditions',
    loadComponent: () => import('./pages/terms-conditions/terms-conditions.component'),
  },
  {
    path: 'general_settings',
    loadComponent: () => import('./pages/general-settings/general-settings.component'),
  },
  {
    path: '**',
    redirectTo: 'licenses',
  },
];
