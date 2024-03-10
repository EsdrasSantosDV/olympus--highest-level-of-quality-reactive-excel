import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  OnInit,
  Output,
  WritableSignal,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  ExpenseValue,
  ExpensesInTheMonth,
} from '../../../../shared/types/interfaces/month-expenses-in-the-month';
import { MatTableModule } from '@angular/material/table';
import { getAllDaysOfMonth } from '../../utils/functions/function-return-array-days';
import { CommonModule } from '@angular/common';
import { CelTableComponent } from '../cel-table/cel-table.component';
import { EditAndCreateExpenseValue } from '../../../../shared/types/interfaces/edit-and-create-expense-value';
import { ExcelValue } from '../../../../shared/types/interfaces/excel-value';
import {
  takeUntilDestroyed,
  toObservable,
  toSignal,
} from '@angular/core/rxjs-interop';
import { BehaviorSubject, EMPTY, map, tap } from 'rxjs';
import { CelTableModelValueComponent } from '../cel-table-model-value/cel-table-model-value.component';
import { ValueSignalMapComponent } from '../value-signal-map/value-signal-map.component';
@Component({
  selector: 'app-month-excel-table',
  standalone: true,
  templateUrl: './month-excel-table.component.html',
  styleUrl: './month-excel-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatTableModule,
    CommonModule,
    CelTableComponent,
    CelTableModelValueComponent,
    ValueSignalMapComponent,
  ],
})
export class MonthExcelTableComponent {
  signalWritrableMapExcelValues = signal<
    Map<string, WritableSignal<ExcelValue>>
  >(new Map<string, WritableSignal<ExcelValue>>());

  injectDestroy = inject(DestroyRef);

  table = input.required<ExpensesInTheMonth>();
  year = input.required<string>();
  @Output() eventChangeExcelValue =
    new EventEmitter<EditAndCreateExpenseValue>();

  computedColumns = computed<string[]>(() => {
    let columns: string[] = [];
    columns.push('name');
    columns.push(
      ...getAllDaysOfMonth(this.year(), this.table().monthId).slice(0, 10)
    );
    columns.push('total');
    return columns;
  });

  effectRxjsExpenseInArray = toSignal(
    toObservable(this.table).pipe(
      map(value => {
        const mappedValues: Map<string, WritableSignal<ExcelValue>> = new Map();
        const tableValue = this.table().expensesMonth;
        tableValue.forEach(expense => {
          const expenseId = `${expense.expenseId}`;
          expense.expensesValues.forEach(expenseValue => {
            const modalityId = `${expenseValue.modalityId}`;
            const dateExpense = `day-${expenseValue.date.getDay()}`;
            const keyConcatenedTotal =
              expenseId + '-' + modalityId + '-' + dateExpense;

            const value = {
              value: expenseValue.value,
              isRealValue: true,
              id: expenseValue.id,
            };
            const signalReference = signal<ExcelValue>(value);
            mappedValues.set(keyConcatenedTotal, signalReference);
          });
        });
        return { mappedValues };
      }),
      tap(value => {
        this.signalWritrableMapExcelValues.set(value.mappedValues);
      }),
      map(v => EMPTY)
    )
  );

  computedlogging = computed(() => {
    const valueChanged = this.signalWritrableMapExcelValues();
    const array: ExcelValue[] = [];
    for (const valor of valueChanged.values()) {
      array.push(valor());
    }
    return array;
  });

  constructor() {
    effect(() =>
      console.log('VALOR DO ARRAY TOTAL', this.signalWritrableMapExcelValues())
    );
  }
}
