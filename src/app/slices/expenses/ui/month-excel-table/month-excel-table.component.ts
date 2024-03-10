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

  signalWritrableMapExcelValuesDay = signal<
    Map<string, WritableSignal<number>>
  >(new Map<string, WritableSignal<number>>());

  signalWritrableMapExcelValuesExpense = signal<
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

  daysConcatened = computed(() => {
    let dates: string[] = [];
    dates.push(
      ...getAllDaysOfMonth(this.year(), this.table().monthId).slice(0, 10)
    );
    return dates;
  });

  expensesIds = computed(() =>
    this.table().expensesMonth.map(expense => expense.expenseId.toString())
  );

  
  effectRxjsInitialTotals = toSignal(
    toObservable(this.daysConcatened).pipe(
      map(value => {
        const mappedValuesDay: Map<string, WritableSignal<number>> = new Map();
        value.forEach(key => {
          const signalValuesDay = signal<number>(0);
          mappedValuesDay.set(key, signalValuesDay);
        });
        return mappedValuesDay;
      }),
      tap(value => this.signalWritrableMapExcelValuesDay.set(value))
    )
  );

  effectRxjsExpenseInArray = toSignal(
    toObservable(this.table).pipe(
      map(value => {
        const mappedValues: Map<string, WritableSignal<ExcelValue>> = new Map();

        const mappedValuesDay: Map<string, WritableSignal<number>> = new Map();

        const tableValue = this.table().expensesMonth;

        tableValue.forEach(expense => {
          const expenseId = `${expense.expenseId}`;
          expense.expensesValues.forEach(expenseValue => {
            const modalityId = `${expenseValue.modalityId}`;
            const dateExpense = `day-${expenseValue.date.getDay()}`;
            const keyConcatenedTotal =
              expenseId + '-' + modalityId + '-' + dateExpense;
            const keyDayAndExpense = expenseId + '-' + dateExpense;
            const value: ExcelValue = {
              value: expenseValue.value,
              isRealValue: true,
              id: expenseValue.id,
            };
            const signalReference = signal<ExcelValue>(value);
            mappedValues.set(keyConcatenedTotal, signalReference);

            const signalDay = mappedValuesDay.get(
              dateExpense
            ) as WritableSignal<number>;

            signalDay.update(
              valueSignalDay => valueSignalDay + (value.value ?? 0)
            );
          });
        });
        return { mappedValues, mappedValuesDay };
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

  computedDaysSignal = computed(() => {
    const valueChanged = this.signalWritrableMapExcelValuesDay();
    const mappedValuesDay: Map<string, number> = new Map();
    for (let [key, value] of valueChanged.entries()) {
      mappedValuesDay.set(key, value());
    }

    return Array.from(mappedValuesDay.values());
  });

  constructor() {
    // effect(() =>
    //   console.log(
    //     'VALOR DO ARRAY TOTAL',
    //     this.signalWritrableMapExcelValuesDay()
    //   )
    // );
  }
}
