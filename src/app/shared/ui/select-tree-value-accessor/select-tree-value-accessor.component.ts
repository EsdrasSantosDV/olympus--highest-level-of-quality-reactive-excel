import { ChangeDetectionStrategy, Component, forwardRef, input, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TreeSelectProjectionComponent } from './tree-select-projection/tree-select-projection.component';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'app-select-tree-value-accessor',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, TreeSelectProjectionComponent, MatCheckboxModule],
  templateUrl: './select-tree-value-accessor.component.html',
  styleUrl: './select-tree-value-accessor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectTreeValueAccessorComponent),
      multi: true,
    },
  ],
})
export class SelectTreeValueAccessorComponent implements ControlValueAccessor {
  titleSIG = input.required<string>();
  placeholderSIG = input.required<string>();
  selectedSIG = signal<any>([]);
  dataSIG = input.required<any[]>();
  keySIG = input.required<string>();
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


}

export interface MyTreeItemBase<T> {
  children?: T[];
  expanded: WritableSignal<boolean>;
  display: string;
  key: string;

  [key: string]: any;
}
