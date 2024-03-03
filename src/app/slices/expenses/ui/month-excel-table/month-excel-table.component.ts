import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  computed,
  input,
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

  signalMappedValues = computed<Map<string, ExpenseValue>>(() => {
    const mappedValues: Map<string, ExpenseValue> = new Map();
    const tableValue = this.table().expensesMonth;
    tableValue.forEach(expense => {
      const expenseId = `${expense.expenseId}`;
      expense.expensesValues.forEach(expenseValue => {
        const modalityId = `${expenseValue.modalityId}`;
        const dateExpense = `day-${expenseValue.date.getDay()}`;
        const keyConcatened = expenseId + '-' + modalityId + '-' + dateExpense;
        if (!mappedValues.has(keyConcatened)) {
          mappedValues.set(keyConcatened, expenseValue);
        }
      });
    });
    return mappedValues;
  });

  signalTotalValuesByExpense = computed<Map<string, number>>(() => {
    const mappedValues: Map<string, number> = new Map();
    const tableValue = this.table().expensesMonth;
    tableValue.forEach(expense => {
      const expenseId = `${expense.expenseId}`;
      expense.expensesValues.forEach(expenseValue => {
        const modalityId = `${expenseValue.modalityId}`;
        const keyConcatened = expenseId + '-' + modalityId;
        let valueAfter = mappedValues.get(keyConcatened) ?? 0;
        mappedValues.set(keyConcatened, valueAfter + (expenseValue.value ?? 0));
      });
    });
    return mappedValues;
  });

  signalTotalValuesByDay = computed<Map<string, number>>(() => {
    const mappedValues: Map<string, number> = new Map();
    const tableValue = this.table().expensesMonth;
    tableValue.forEach(expense => {
      expense.expensesValues.forEach(expenseValue => {
        const dateExpense = `day-${expenseValue.date.getDay()}`;
        let valueAfter = mappedValues.get(dateExpense) ?? 0;
        mappedValues.set(dateExpense, valueAfter + (expenseValue.value ?? 0));
      });
    });
    return mappedValues;
  });

  signalTotalByTable = computed<number>(() => {
    const sumWithInitial = Array.from(
      this.signalTotalValuesByDay().values()
    ).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return sumWithInitial;
  });

  getCellValue(
    elementId: string,
    modalityId: string,
    item: string
  ): number | null {
    const key = `${elementId}-${modalityId}-${item}`;
    return this.signalMappedValues().get(key)?.value ?? null;
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
    let editValue: EditAndCreateExpenseValue;
    if (this.signalMappedValues().has(key)) {
      const expenseValue = this.signalMappedValues().get(key);
      if (expenseValue) {
        editValue = {
          day: expenseValue.date,
          expenseId: expenseValue.expenseId,
          idTable: this.table().id,
          isEdit: true,
          modalityId: expenseValue.modalityId,
          id: expenseValue.id,
          value: valueChanged ?? null,
        };

        this.eventChangeExcelValue.emit(editValue);
      }
    } else {
    }
  }
}
