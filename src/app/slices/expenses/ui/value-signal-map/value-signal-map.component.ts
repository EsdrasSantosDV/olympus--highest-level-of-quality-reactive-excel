import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  WritableSignal,
  computed,
  effect,
  input,
  model,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExcelValue } from '../../../../shared/types/interfaces/excel-value';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { EMPTY, combineLatest, map, skip, tap, withLatestFrom } from 'rxjs';
import { concatLatestFrom } from '@ngrx/operators';

@Component({
  selector: 'app-value-signal-map',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './value-signal-map.component.html',
  styleUrl: './value-signal-map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValueSignalMapComponent {
  celValue = model<number | null>(null);

  modelSignal = model.required<Map<string, WritableSignal<ExcelValue>>>();

  isEditable = input<boolean>(true);

  isEditing = signal<boolean>(false);

  keyMapExpense = input.required();

  keyMapModality = input.required();

  keyMapDay = input.required();

  keyMapConcatened = computed(
    () => `${this.keyMapExpense()}-${this.keyMapModality()}-${this.keyMapDay()}`
  );

  valueComputed = computed(() => {
    if (this.modelSignal().has(this.keyMapConcatened())) {
      return this.modelSignal().get(
        this.keyMapConcatened()
      ) as WritableSignal<ExcelValue>;
    } else {
      return signal<ExcelValue>({
        isRealValue: false,
        value: null,
      });
    }
  });

  effectRxjsNotRealValue = toSignal(
    combineLatest(
      toObservable(this.modelSignal),
      toObservable(this.keyMapConcatened)
    ).pipe(
      map(([model, key]) => {
        if (!model.has(key)) {
          const signalNew = signal<ExcelValue>({
            isRealValue: false,
            value: null,
          });
          model.set(key, signalNew);
          const mappedValues: Map<string, WritableSignal<ExcelValue>> = new Map(
            model.entries()
          );
          this.modelSignal.set(mappedValues);
        }
        return EMPTY;
      })
    )
  );

  effectRxjsInitialValue = toSignal(
    toObservable(this.valueComputed).pipe(
      tap(value => this.celValue.set(value().value))
    )
  );

  effectRxjsInitialValueChangeValue = toSignal(
    toObservable(this.celValue).pipe(
      tap(value =>
        this.valueComputed().update(vxa => {
          return {
            value: value,
            isRealValue: vxa.isRealValue,
            id: vxa.id,
          };
        })
      )
    )
  );

  toggleEdit(): void {
    this.isEditing.update(v => !v);
  }

  constructor() {
    //effect(() => console.log(this.valueComputed()));
  }
}
