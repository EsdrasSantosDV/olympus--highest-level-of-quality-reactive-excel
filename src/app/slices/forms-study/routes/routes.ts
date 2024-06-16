import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: async () =>
      (
        await import(
          '../features/forms-container-study/forms-container-study.component'
        )
      ).FormsContainerStudyComponent,
    children: [],
  },
];
