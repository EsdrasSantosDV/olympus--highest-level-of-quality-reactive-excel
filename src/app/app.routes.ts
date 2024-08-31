import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/ui/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'rodinha-punk',
    loadChildren: async () =>
      (await import('./slices/projection-content-poc/routes/routes')).routes,
  },
  {
    path: 'signals',
    loadChildren: async () =>
      (await import('./slices/signals/routes/routes')).routes,
  },
  {
    path: 'home',
    loadChildren: async () =>
      (await import('./slices/home/routes/routes')).routes,
  },
  {
    path: 'expenses-year',
    loadChildren: async () =>
      (await import('./slices/expenses/routes/routes')).routes,
  },
  {
    path: 'forms-study',
    loadChildren: async () =>
      (await import('./slices/forms-study/routes/routes')).routes,
  },
  {
    path: 'kt-lge',
    loadChildren: async () =>
      (await import('./slices/forms-study-tech/routes/routes')).routes,
  },
  { path: '**', component: PageNotFoundComponent },
];
