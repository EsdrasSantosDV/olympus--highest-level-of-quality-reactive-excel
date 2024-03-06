import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExcelValue } from '../../../../shared/types/interfaces/excel-value';

@Component({
  selector: 'app-cel-table-model-value',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cel-table-model-value.component.html',
  styleUrl: './cel-table-model-value.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CelTableModelValueComponent {
  celValue = signal<number | null>(null);

  modelSignal = model.required();

  isEditable = input<boolean>(true);

  isEditing = signal<boolean>(false);

  keyMapExpense = input.required();

  keyMapModality = input.required();

  keyMapDay = input.required();

  keyMapConcatened = computed(
    () => `${this.keyMapExpense()}-${this.keyMapModality()}-${this.keyMapDay()}`
  );

  toggleEdit(): void {
    this.isEditing.update(v => !v);
  }
}
