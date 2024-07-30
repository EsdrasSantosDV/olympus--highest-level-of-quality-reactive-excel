import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: async () =>
      (
        await import(
          '../features/case-card/case-card.component'
        )
      ).CaseCardComponent,
    children: [],
  },
];
