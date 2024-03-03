import { inject } from '@angular/core';

import { tap } from 'rxjs';

import {
  getState,
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { ExpensesInTheMonth } from '../../../shared/types/interfaces/month-expenses-in-the-month';
import { ExpenseHttpService } from '../../../core/services/expenses-http-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { EditAndCreateExpenseValue } from '../../../shared/types/interfaces/edit-and-create-expense-value';

export type ExpenseState = {
  expensesMonth: ExpensesInTheMonth[];
};

export const initialState: ExpenseState = {
  expensesMonth: [],
};

export const ExpensesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, httpExpenses = inject(ExpenseHttpService)) => ({
    loadExpenses() {
      return httpExpenses.getExpenses().pipe(
        tap(value =>
          patchState(store, {
            expensesMonth: value,
          })
        )
      );
    },
    changeValueTableInStore(editValuePayload: EditAndCreateExpenseValue) {
      const { day, expenseId, idTable, isEdit, modalityId, value, id } =
        editValuePayload;
      if (isEdit) {
       
      }
    },
  })),
  withHooks({
    onInit({ expensesMonth, loadExpenses, changeValueTableInStore }) {
      toSignal(loadExpenses());
    },
    onDestroy() {},
  })
);
