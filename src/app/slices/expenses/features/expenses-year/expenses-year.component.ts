import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ExpensesStore } from '../../data-access/expenses-state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expenses-year',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expenses-year.component.html',
  styleUrl: './expenses-year.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesYearComponent {
  readonly store = inject(ExpensesStore);
}
