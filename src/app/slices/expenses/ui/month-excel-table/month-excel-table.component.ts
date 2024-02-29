import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { ExpensesInTheMonth } from '../../../../shared/types/interfaces/month-expenses-in-the-month';
import { MatTableModule } from '@angular/material/table';
import { getAllDaysOfMonth } from '../../utils/functions/function-return-array-days';
import { CommonModule } from '@angular/common';
import { CelTableComponent } from "../cel-table/cel-table.component";

@Component({
    selector: 'app-month-excel-table',
    standalone: true,
    templateUrl: './month-excel-table.component.html',
    styleUrl: './month-excel-table.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatTableModule, CommonModule, CelTableComponent]
})
export class MonthExcelTableComponent {
  table = input.required<ExpensesInTheMonth>();
  year = input.required<string>();
  computedColumns = computed<string[]>(() => {
    let columns: string[] = [];
    columns.push('name');
    columns.push(...getAllDaysOfMonth(this.year(), this.table().monthId));
    columns.push('total');
    return columns;
  });




}
