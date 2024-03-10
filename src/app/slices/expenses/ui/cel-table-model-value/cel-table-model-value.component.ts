import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  model,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExcelValue } from '../../../../shared/types/interfaces/excel-value';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { skip, tap } from 'rxjs';
@Component({
  selector: 'app-cel-table-model-value',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cel-table-model-value.component.html',
  styleUrl: './cel-table-model-value.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CelTableModelValueComponent {
  celValue = model<number | null>(null);

  modelSignal = model.required<Map<string, ExcelValue>>();

  isEditable = input<boolean>(true);

  isEditing = signal<boolean>(false);

  keyMapExpense = input.required();

  keyMapModality = input.required();

  keyMapDay = input.required();

  keyMapConcatened = computed(
    () => `${this.keyMapExpense()}-${this.keyMapModality()}-${this.keyMapDay()}`
  );

  value = computed(
    () => this.modelSignal().get(this.keyMapConcatened()) ?? null
  );

  isRealValue = computed(
    () => this.modelSignal().get(this.keyMapConcatened())?.isRealValue ?? false
  );

  idValue = computed(() => this.modelSignal().get(this.keyMapConcatened())?.id);

  signalArrayValues = computed(() => {
    return Array.from(this.modelSignal().keys());
  });

  valueComputed = toSignal(
    toObservable(this.value).pipe(
      tap(valueComputed => this.celValue.set(valueComputed?.value ?? null))
    )
  );

  constructor() {
    // effect(()=>console.log(this.celValue())
    // )
  }

  valueSignalChanged = toSignal(
    toObservable(this.celValue).pipe(
      skip(1),
      tap(valueChanged => {
        this.modelSignal.update(v => {
          const shallowCopyMapTotal = new Map(v.entries());
          shallowCopyMapTotal.set(this.keyMapConcatened(), {
            value: valueChanged,
            isRealValue: this.isRealValue(),
            id: this.idValue(),
          });
          return shallowCopyMapTotal;
        });
      })
    )
  );

  toggleEdit(): void {
    this.isEditing.update(v => !v);
  }
}
