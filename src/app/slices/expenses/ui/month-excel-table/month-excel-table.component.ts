import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  WritableSignal,
  computed,
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
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
@Component({
  selector: 'app-month-excel-table',
  standalone: true,
  templateUrl: './month-excel-table.component.html',
  styleUrl: './month-excel-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTableModule, CommonModule, CelTableComponent],
})
export class MonthExcelTableComponent {
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

  signalTotalValuesByDay = signal<Map<string, number>>(
    new Map<string, number>()
  );

  signalTotalValuesByExpense = signal<Map<string, number>>(
    new Map<string, number>()
  );

  signalMappedValues = toSignal(
    toObservable(this.table).pipe(
      map(value => {
        const mappedValues: Map<string, ExcelValue> = new Map();
        const mappedValuesTotalByDay: Map<string, number> = new Map();
        const mappedValuesTotalByExpenseAndModality: Map<string, number> =
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

            mappedValues.set(keyConcatenedTotal, {
              value: expenseValue.value,
              isRealValue: true,
              id: expenseValue.id,
            });

            const valueByDay = mappedValuesTotalByDay.get(dateExpense);
            const valueByExpenseAndModality =
              mappedValuesTotalByExpenseAndModality.get(keyConcatenedModality);
            if (valueByDay) {
              mappedValuesTotalByDay.set(
                dateExpense,
                valueByDay + (expenseValue.value ?? 0)
              );
            } else {
              mappedValuesTotalByDay.set(dateExpense, expenseValue.value ?? 0);
            }

            if (valueByExpenseAndModality) {
              mappedValuesTotalByExpenseAndModality.set(
                keyConcatenedModality,
                valueByExpenseAndModality + (expenseValue.value ?? 0)
              );
            } else {
              mappedValuesTotalByExpenseAndModality.set(
                keyConcatenedModality,
                expenseValue.value ?? 0
              );
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
        this.signalValueWritrable.set(value.mappedValues);
        this.signalTotalValuesByDay.set(value.mappedValuesTotalByDay);
        this.signalTotalValuesByExpense.set(
          value.mappedValuesTotalByExpenseAndModality
        );
      })
    )
  );

  signalArrayValues = computed(() => {
    return Array.from(this.signalValueWritrable().values());
  });

  signalTotalByTable = computed<number>(() => {
    const sumWithInitial = Array.from(
      this.signalValueWritrable().values()
    ).reduce(
      (accumulator, currentValue) => accumulator + (currentValue.value ?? 0),
      0
    );
    return sumWithInitial;
  });

  getCellValue(
    elementId: string,
    modalityId: string,
    item: string
  ): number | null {
    const key = `${elementId}-${modalityId}-${item}`;
    return this.signalValueWritrable().get(key)?.value ?? null;
  }

  getCellTotalByDay(day: string): number {
    const key = `${day}`;
    return this.signalTotalValuesByDay().get(key) ?? 0;
  }

  getCellTotalValue(elementId: string, modalityId: string): number {
    const key = `${elementId}-${modalityId}`;
    return this.signalTotalValuesByExpense().get(key) ?? 0;
  }

  editValueChange(
    expenseId: number,
    modalityId: number,
    valueChanged: number | null | undefined,
    date: string
  ) {
    const key = `${expenseId}-${modalityId}-${date}`;


    let valueByKey = this.signalValueWritrable().get(key);
    let valueByDay = this.signalTotalValuesByDay().get(date);
    let valueByExpense = this.signalTotalValuesByExpense().get(
      `${expenseId}-${modalityId}`
    );

    if (valueByKey) {
      valueByKey.value = valueChanged ?? null;
      this.signalValueWritrable().set(key, valueByKey);
      const shallowCopyMap = new Map(this.signalValueWritrable().entries());
      this.signalValueWritrable.set(shallowCopyMap);
    } else {
      this.signalValueWritrable().set(key, {
        value: valueChanged ?? null,
        isRealValue: false,
      });
      const shallowCopyMap = new Map(this.signalValueWritrable().entries());
      this.signalValueWritrable.set(shallowCopyMap);
    }

    if (valueByDay) {
      this.signalTotalValuesByDay().set(date, valueByDay + (valueChanged ?? 0));
      const shallowCopyMap = new Map(this.signalTotalValuesByDay().entries());
      this.signalTotalValuesByDay.set(shallowCopyMap);
    } else {
      this.signalTotalValuesByDay().set(date, valueChanged ?? 0);
      const shallowCopyMap = new Map(this.signalTotalValuesByDay().entries());
      this.signalTotalValuesByDay.set(shallowCopyMap);
    }

    if (valueByExpense) {
      this.signalTotalValuesByExpense().set(
        `${expenseId}-${modalityId}`,
        valueByExpense + (valueChanged ?? 0)
      );
      const shallowCopyMap = new Map(this.signalTotalValuesByExpense().entries());
      this.signalTotalValuesByExpense.set(shallowCopyMap);
    } else {
      this.signalTotalValuesByExpense().set(`${expenseId}-${modalityId}`, valueChanged ?? 0);
      const shallowCopyMap = new Map(this.signalTotalValuesByExpense().entries());
      this.signalTotalValuesByExpense.set(shallowCopyMap);
    }
  }
}
