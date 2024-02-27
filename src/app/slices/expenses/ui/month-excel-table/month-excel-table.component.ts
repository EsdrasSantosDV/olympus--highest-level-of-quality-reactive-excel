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

@Component({
  selector: 'app-month-excel-table',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './month-excel-table.component.html',
  styleUrl: './month-excel-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  dataSource = ELEMENT_DATA;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
