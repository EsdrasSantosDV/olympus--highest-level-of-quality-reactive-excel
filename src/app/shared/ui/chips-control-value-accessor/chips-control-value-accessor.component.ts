import { ChangeDetectionStrategy, Component, computed, forwardRef, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-chips-control-value-accessor',
  standalone: true,
  imports: [CommonModule, FormsModule, MatAutocompleteModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatOptionModule],
  templateUrl: './chips-control-value-accessor.component.html',
  styleUrl: './chips-control-value-accessor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsControlValueAccessorComponent),
      multi: true,
    },
  ],
})
export class ChipsControlValueAccessorComponent implements ControlValueAccessor {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  dataSIG = input.required<any[]>();
  titleSIG = input.required<string>();
  placeholderSIG = input.required<string>();
  keySIG = input.required<string>();
  selectedSIG = signal<any[]>([]);
  inputValueSIG = signal<string>('');
  inputValuePerformedSIG = toSignal(toObservable(this.inputValueSIG).pipe(
    debounceTime(300),
    distinctUntilChanged(),
  ), {
    initialValue: '',
  });

  optionsFilteredSIG =
    computed(() => {
      const valueInput = this.inputValuePerformedSIG();
      const allOptions = this.dataSIG();
      const keyOption = this.keySIG();
      return allOptions.filter((value) => {
          return value[keyOption].toLowerCase().includes(valueInput.toLowerCase());
        },
      );
    });


  onChanged!: (value: any) => void;
  onTouched!: () => void;


  registerOnChange(fn: (value: any) => void): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(optionsSelected: any[]): void {
    this.selectedSIG.set(optionsSelected);
  }

  removeChip(optionChip: any) {
    console.log('removendo a caceta');
  }


  addChip($event: MatChipInputEvent) {
    console.log('esdras esteve aqui 1');
  }

  selectedOption($event: MatAutocompleteSelectedEvent) {
    console.log('esdras esteve aqui SELECTED');
    this.inputValueSIG.set('');
    this.selectedSIG.update((value) => [...value, $event.option.value]);
  }
}
