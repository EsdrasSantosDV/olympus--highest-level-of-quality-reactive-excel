import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ExpensesStore } from '../../data-access/expenses-state';
import { CommonModule } from '@angular/common';
import { MonthExcelTableComponent } from "../../ui/month-excel-table/month-excel-table.component";

@Component({
    selector: 'app-expenses-year',
    standalone: true,
    templateUrl: './expenses-year.component.html',
    styleUrl: './expenses-year.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, MonthExcelTableComponent]
})
export class ExpensesYearComponent {
  readonly store = inject(ExpensesStore);
}
