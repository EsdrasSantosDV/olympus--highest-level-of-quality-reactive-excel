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
import { EMPTY, combineLatest, map, pairwise, skip, tap, withLatestFrom } from 'rxjs';
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

  modelSignalDay = model.required<Map<string, WritableSignal<number>>>();

  isEditable = input<boolean>(true);

  isEditing = signal<boolean>(false);

  keyMapExpense = input.required();

  keyMapModality = input.required();

  keyMapDay = input.required<string>();

  keyMapConcatened = computed(
    () => `${this.keyMapExpense()}-${this.keyMapModality()}-${this.keyMapDay()}`
  );

  keyMapDayConcatened = computed(
    () => `${this.keyMapExpense()}-${this.keyMapDay()}`
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

  valueDayComputed = computed(() => {
    if (this.modelSignalDay().has(this.keyMapDay())) {
      return this.modelSignalDay().get(
        this.keyMapDay()
      ) as WritableSignal<number>;
    } else {
      return signal<number>(0);
    }
  });

  effectRxjsNotRealValue = toSignal(
    combineLatest(
      toObservable(this.modelSignal),
      toObservable(this.keyMapConcatened)
    ).pipe(
      tap(([model, key]) => {
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
      })
    )
  );


  // effectRxjsNotRealValueDay = toSignal(
  //   combineLatest(
  //     toObservable(this.modelSignalDay),
  //     toObservable(this.keyMapDayConcatened)
  //   ).pipe(
  //     tap(([model, key]) => {
  //       if (!model.has(key)) {
  //         const signalNew = signal<number>(0);
  //         model.set(key, signalNew);
  //         const mappedValues: Map<string, WritableSignal<number>> = new Map(
  //           model.entries()
  //         );
          
  //       }
  //     })
  //   )
  // );

  effectRxjsInitialValue = toSignal(
    toObservable(this.valueComputed).pipe(
      tap(value => this.celValue.set(value().value))
    )
  );

  effectRxjsInitialValueChangeValue = toSignal(
    toObservable(this.celValue).pipe(
      pairwise(),
      tap(value =>
        {
          const valueAnterior=value[0] ?? 0;
          const valueAgora=value[1] ?? 0;
          let valueReal=0;
          if(valueAnterior >=valueAgora){
            valueReal=valueAnterior-valueAgora;
          }
          else{
            valueReal=valueAnterior+valueAgora;
          }

          this.valueComputed().update(vxa => {
            return {
              value: value[1],
              isRealValue: vxa.isRealValue,
              id: vxa.id,
            };
          })  
          this.valueDayComputed().update(vxd=>vxd + (valueReal ?? 0));

        
        }
       
        
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
