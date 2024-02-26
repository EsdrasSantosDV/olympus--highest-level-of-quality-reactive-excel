import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: async () =>
      (
        await import(
          '../features/expenses-year/expenses-year.component'
        )
      ).ExpensesYearComponent,
    children: [],
  },
];
