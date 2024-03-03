import {
  ChangeDetectionStrategy,
  Component,
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
  
  computedColumns = computed<string[]>(() => {
    let columns: string[] = [];
    columns.push('name');
    columns.push(...getAllDaysOfMonth(this.year(), this.table().monthId).slice(0,10));
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


  signalTotalValuesByExpense=computed<Map<string, number>>(() => {
    const mappedValues: Map<string, number> = new Map();
    const tableValue = this.table().expensesMonth;
    tableValue.forEach(expense => {
      const expenseId = `${expense.expenseId}`;
      const modalities=expense.modalities;
      expense.expensesValues.forEach(expenseValue => {
        const modalityId = `${expenseValue.modalityId}`;
        const keyConcatened = expenseId + '-' + modalityId;
        let valueAfter=mappedValues.get(keyConcatened) ?? 0;
        mappedValues.set(keyConcatened, valueAfter + expenseValue.value);
      });
    });
    return mappedValues;
  });



  getCellValue(elementId: string, modalityId: string, item: string): any {
    const key = `${elementId}-${modalityId}-${item}`;
    return this.signalMappedValues().get(key)?.value;
  }

  getCellTotalValue(elementId: string, modalityId: string): any {
    const key = `${elementId}-${modalityId}`;
    return this.signalTotalValuesByExpense().get(key);
  }
}
