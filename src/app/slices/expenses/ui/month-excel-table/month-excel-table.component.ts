import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  OnInit,
  Output,
  WritableSignal,
  computed,
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
import { BehaviorSubject, map, tap } from 'rxjs';
import { CelTableModelValueComponent } from '../cel-table-model-value/cel-table-model-value.component';
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
  ],
})
export class MonthExcelTableComponent implements OnInit {
  /*
  TRIGGERS
  */
  triggerComplete = new BehaviorSubject(0);
  triggerDay = new BehaviorSubject(0);
  triggerExpense = new BehaviorSubject(0);

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

  signalValueWritrable = signal<Map<string, ExcelValue>>(
    new Map<string, ExcelValue>()
  );

  signalTotalValuesByDay = signal<Map<string, ExcelValue[]>>(
    new Map<string, ExcelValue[]>()
  );

  signalTotalValuesByExpense = signal<Map<string, ExcelValue[]>>(
    new Map<string, ExcelValue[]>()
  );

  signalMappedValues = toSignal(
    toObservable(this.table).pipe(
      map(value => {
        const mappedValues: Map<string, ExcelValue> = new Map();
        const mappedValuesTotalByDay: Map<string, ExcelValue[]> = new Map();
        const mappedValuesTotalByExpenseAndModality: Map<string, ExcelValue[]> =
          new Map();

        const tableValue = this.table().expensesMonth;
        tableValue.forEach(expense => {
          const expenseId = `${expense.expenseId}`;
          expense.expensesValues.forEach(expenseValue => {
            const modalityId = `${expenseValue.modalityId}`;
            const dateExpense = `day-${expenseValue.date.getDay()}`;
            const keyConcatenedTotal =
              expenseId + '-' + modalityId + '-' + dateExpense;

            const keyConcatenedModality = expenseId + '-' + modalityId;
            const value = {
              value: expenseValue.value,
              isRealValue: true,
              id: expenseValue.id,
            };
            mappedValues.set(keyConcatenedTotal, value);

            if (mappedValuesTotalByDay.has(dateExpense)) {
              const arrayValues = mappedValuesTotalByDay.get(dateExpense) ?? [];
              arrayValues.push(value);
              mappedValuesTotalByDay.set(dateExpense, arrayValues);
            } else {
              mappedValuesTotalByDay.set(dateExpense, [value]);
            }

            if (
              mappedValuesTotalByExpenseAndModality.has(keyConcatenedModality)
            ) {
              const arrayValues =
                mappedValuesTotalByExpenseAndModality.get(
                  keyConcatenedModality
                ) ?? [];
              arrayValues.push(value);
              mappedValuesTotalByExpenseAndModality.set(
                keyConcatenedModality,
                arrayValues
              );
            } else {
              mappedValuesTotalByExpenseAndModality.set(keyConcatenedModality, [
                value,
              ]);
            }
          });
        });
        return {
          mappedValues,
          mappedValuesTotalByDay,
          mappedValuesTotalByExpenseAndModality,
        };
      }),
      tap(value => {
        console.log('primeira');

        this.signalValueWritrable.set(value.mappedValues);
        this.signalTotalValuesByDay.set(value.mappedValuesTotalByDay);
        this.signalTotalValuesByExpense.set(
          value.mappedValuesTotalByExpenseAndModality
        );
      })
    )
  );

  ngOnInit(): void {
    // toObservable(this.signalValueWritrable)
    //   .pipe(
    //     tap(() => {
    //       const value = this.triggerComplete.value;
    //       this.triggerComplete.next(value + 1);
    //     }),
       
    //   )
    //   .subscribe();

    // toObservable(this.signalTotalValuesByDay)
    //   .pipe(
    //     tap(() => {
    //       const value = this.triggerDay.value;
    //       this.triggerDay.next(value + 1);
    //     }),
     
    //   )
    //   .subscribe();

    // toObservable(this.signalTotalValuesByExpense)
    //   .pipe(
    //     tap(() => {
    //       const value = this.triggerExpense.value;
    //       this.triggerExpense.next(value + 1);
    //     }),
       
    //   )
    //   .subscribe();
  }

  signalArrayValues = computed(() => {
    return Array.from(this.signalValueWritrable().values());
  });

  signalArrayValuesDayOne = computed(() => {
    return Array.from(this.signalTotalValuesByDay().values());
  });

  signalArrayValuesByExpense = computed(() => {
    return Array.from(this.signalTotalValuesByExpense().values());
  });

  // signalTotalByTable = computed<number>(() => {
  //   const sumWithInitial = Array.from(
  //     this.signalValueWritrable().values()
  //   ).reduce(
  //     (accumulator, currentValue) => accumulator + (currentValue.value ?? 0),
  //     0
  //   );
  //   return sumWithInitial;
  // });

  // getCellValue(
  //   elementId: string,
  //   modalityId: string,
  //   item: string
  // ): number | null {
  //   const key = `${elementId}-${modalityId}-${item}`;
  //   const value=this.quantasvezes.getValue();
  //   this.quantasvezes.next(value+1);
  //   return this.signalValueWritrable().get(key)?.value ?? null;
  // }

  // getCellTotalByDay(day: string): number {
  //   const key = `${day}`;
  //   return (
  //     this.signalTotalValuesByDay()
  //       .get(key)
  //       ?.reduce(
  //         (accumulator, currentValue) =>
  //           accumulator + (currentValue.value ?? 0),
  //         0
  //       ) ?? 0
  //   );
  // }

  // getCellTotalValue(elementId: string, modalityId: string): number {
  //   const key = `${elementId}-${modalityId}`;

  //   return (
  //     this.signalTotalValuesByExpense()
  //       .get(key)
  //       ?.reduce(
  //         (accumulator, currentValue) =>
  //           accumulator + (currentValue.value ?? 0),
  //         0
  //       ) ?? 0
  //   );
  // }

  // editValueChange(
  //   expenseId: number,
  //   modalityId: number,
  //   valueChanged: number | null | undefined,
  //   date: string
  // ) {
  //   const keyConcatened = `${expenseId}-${modalityId}-${date}`;
  //   const keyConcatenedModality = `${expenseId}-${modalityId}`;
  //   let valueByKey = this.signalValueWritrable().get(keyConcatened);
  //   this.quantasvezesUpdate.update((v)=>v+1);

  //   if (valueByKey) {
  //     valueByKey.value = valueChanged ?? null;
  //     this.signalValueWritrable().set(keyConcatened, valueByKey);
  //     const shallowCopyMap = new Map(this.signalValueWritrable().entries());
  //     this.signalValueWritrable.set(shallowCopyMap);

  //     const arrayValues =
  //       this.signalTotalValuesByExpense().get(keyConcatenedModality) ?? [];
  //     const index = arrayValues.findIndex(value => value.id === valueByKey?.id);
  //     arrayValues[index] = valueByKey;
  //     this.signalTotalValuesByExpense().set(keyConcatenedModality, arrayValues);
  //     const shallowCopyMapTotal = new Map(
  //       this.signalTotalValuesByExpense().entries()
  //     );
  //     this.signalTotalValuesByExpense.set(shallowCopyMapTotal);

  //     const arrayValuesDay = this.signalTotalValuesByDay().get(date) ?? [];
  //     const indexDay = arrayValuesDay.findIndex(
  //       value => value.id === valueByKey?.id
  //     );
  //     arrayValuesDay[indexDay] = valueByKey;
  //     this.signalTotalValuesByDay().set(date, arrayValuesDay);
  //     const shallowCopyMapDay = new Map(
  //       this.signalTotalValuesByDay().entries()
  //     );
  //     this.signalTotalValuesByDay.set(shallowCopyMapDay);
  //   } else {
  //     this.signalValueWritrable().set(keyConcatened, {
  //       value: valueChanged ?? null,
  //       isRealValue: false,
  //     });
  //     const shallowCopyMap = new Map(this.signalValueWritrable().entries());
  //     this.signalValueWritrable.set(shallowCopyMap);

  //     const arrayValues =
  //       this.signalTotalValuesByExpense().get(keyConcatenedModality) ?? [];
  //     arrayValues.push({
  //       value: valueChanged ?? null,
  //       isRealValue: false,
  //     });
  //     this.signalTotalValuesByExpense().set(keyConcatenedModality, arrayValues);
  //     const shallowCopyMapTotal = new Map(
  //       this.signalTotalValuesByExpense().entries()
  //     );
  //     this.signalTotalValuesByExpense.set(shallowCopyMapTotal);

  //     const arrayValuesDay = this.signalTotalValuesByDay().get(date) ?? [];
  //     arrayValuesDay.push({
  //       value: valueChanged ?? null,
  //       isRealValue: false,
  //     });
  //     this.signalTotalValuesByDay().set(date, arrayValuesDay);
  //     const shallowCopyMapDay = new Map(
  //       this.signalTotalValuesByDay().entries()
  //     );
  //     this.signalTotalValuesByDay.set(shallowCopyMapDay);
  //   }
  // }
}
