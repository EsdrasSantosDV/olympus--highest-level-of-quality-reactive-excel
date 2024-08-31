import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'ex-one',
    loadComponent: async () =>
      (
        await import(
          '../features/one-template-driven/one-template-driven.component'
        )
      ).OneTemplateDrivenComponent,
    children: [],
  },
  {
    path: 'componente-explicacao',
    loadComponent: async () =>
      (
        await import(
          '../features/componente-de-explicacao/componente-de-explicacao.component'
        )
      ).ComponenteDeExplicacaoComponent,
    children: [],
  },
  {
    path: 'exercise-one',
    loadComponent: async () =>
      (
        await import(
          '../features/exercise-one/exercise-one.component'
        )
      ).ExerciseOneComponent,
    children: [],
  },
  {
    path: 'exercise-two',
    loadComponent: async () =>
      (
        await import(
          '../features/exercise-two/exercise-two.component'
        )
      ).ExerciseTwoComponent,
    children: [],
  },
  {
    path: 'exercise-three',
    loadComponent: async () =>
      (
        await import(
          '../features/exercise-three/exercise-three.component'
        )
      ).ExerciseThreeComponent,
    children: [],
  },
  {
    path: 'exercise-four',
    loadComponent: async () =>
      (
        await import(
          '../features/exercise-four/exercise-four.component'
        )
      ).ExerciseFourComponent,
    children: [],
  },
  {
    path: 'exercise-five',
    loadComponent: async () =>
      (
        await import(
          '../features/exercise-five/exercise-five.component'
        )
      ).ExerciseFiveComponent,
    children: [],
  },
  {
    path: 'exercise-six',
    loadComponent: async () =>
      (
        await import(
          '../features/exercise-six/exercise-six.component'
        )
      ).ExerciseSixComponent,
    children: [],
  },
];
