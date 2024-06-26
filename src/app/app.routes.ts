import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/ui/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
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
  { path: '**', component: PageNotFoundComponent },
];
