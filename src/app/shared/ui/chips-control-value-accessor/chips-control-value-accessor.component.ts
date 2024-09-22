import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-chips-control-value-accessor',
  standalone: true,
  imports: [CommonModule],
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
  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
  }

}
