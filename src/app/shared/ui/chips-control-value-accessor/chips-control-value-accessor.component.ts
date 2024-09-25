import { ChangeDetectionStrategy, Component, computed, forwardRef, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
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
  disabledSIG = signal(false);
  inputValuePerformedSIG = toSignal(toObservable(this.inputValueSIG).pipe(
    debounceTime(300),
    distinctUntilChanged(),
  ), {
    initialValue: '',
  });

  optionsFilteredSIG = computed(() => {
    const search = this.inputValuePerformedSIG().toLowerCase();
    const data = this.dataSIG();
    const key = this.keySIG();
    const selected = this.selectedSIG();

    return this.binarySearchFilter(data, search, key, selected);
  });

  private binarySearchFilter(data: any[], search: string, key: string, selected: any[]): any[] {
    //if (!search) return data.filter(option => !selected.includes(option));

    let low = 0;
    let high = data.length - 1;
    let results: any[] = [];

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const midVal = data[mid][key].toLowerCase();

      if (midVal.startsWith(search)) {
        // Encontrar todos os elementos que correspondem
        results = [data[mid], ...this.collectMatches(data, mid, key, search)];
        break;
      } else if (midVal < search) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    // Filtrar os elementos já selecionados
    return results.filter(option => !selected.includes(option));
  }

  private collectMatches(data: any[], mid: number, key: string, search: string): any[] {
    let matches = [];
    let left = mid - 1;
    let right = mid + 1;

    // Check left side
    while (left >= 0 && data[left][key].toLowerCase().startsWith(search)) {
      matches.push(data[left]);
      left--;
    }

    // Check right side
    while (right < data.length && data[right][key].toLowerCase().startsWith(search)) {
      matches.push(data[right]);
      right++;
    }

    return matches;
  }


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
    const valueSelected = this.selectedSIG();
    const index = valueSelected.indexOf(optionChip);
    if (index >= 0) {
      valueSelected.splice(index, 1);
      this.selectedSIG.set([...valueSelected]);
      this.onChanged(this.selectedSIG());
      this.onTouched();
    }
  }

  selectedOption($event: MatAutocompleteSelectedEvent) {
    this.inputValueSIG.set('');
    this.selectedSIG.update((value) => [...value, $event.option.value]);
    this.onChanged(this.selectedSIG());
    this.onTouched();
  }

  setDisabledState(isDisabled: boolean) {
    this.disabledSIG.set(isDisabled);
  }
}
