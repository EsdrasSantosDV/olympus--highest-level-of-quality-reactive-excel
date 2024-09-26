import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  inject,
  input,
  model,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormBuilder, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TreeSelectProjectionComponent } from './tree-select-projection/tree-select-projection.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { toObservable } from '@angular/core/rxjs-interop';
import { combineLatest, tap } from 'rxjs';


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
  selectedSIG = signal<any[]>([]);
  dataSIG = input.required<any[]>();
  keySIG = input.required<string>();
  computedGroupsEnabled = computed(() => {
      const setGroupsEnabled: {
        id: string;
        expandedGroup: WritableSignal<boolean>;
      }[] = [];
      this.dataSIG().forEach((item) => {
        const key = item.id;
        const expanded = model<boolean>(false);
        setGroupsEnabled.push({
          id: `${key}`,
          expandedGroup: expanded,
        });
      });
      return setGroupsEnabled;
    },
  );

  dataLength = computed(() => this.dataSIG().length);

  getSignalGroupsChanges = computed(() => {
      const length = this.dataLength();
      const groups = this.computedGroupsEnabled();
      const setGroupsEnabled: {
        id: string,
        expandedGroup: boolean
      }[] = [];


      for (let i = 0; i < length; i++) {
        const value = groups[i].expandedGroup();
        const id = groups[i].id;
        setGroupsEnabled.push({ id, expandedGroup: value });
      }

      return setGroupsEnabled;
    },
  );

  setSignalGroupsChanges = toObservable(this.getSignalGroupsChanges);


  allOptions = computed(() => {
    const allOptions: any[] = [];
    this.dataSIG().forEach((item) => {
      allOptions.push(item);
      if (item.children) {
        item.children.forEach((child: any) => {
          allOptions.push(child);
        });
      }
    });
    return allOptions;
  });
  fb = inject(FormBuilder);
  selectAllCheckbox = this.fb.nonNullable.control(false);


  allOptions$ = toObservable(this.allOptions);
  selectedOptions$ = toObservable(this.selectedSIG);
  allOptionsEffect = combineLatest([this.allOptions$, this.selectAllCheckbox.valueChanges]).pipe(
    tap(
      ([allOptions, selectedAll]) => {
        if (selectedAll) {
          this.selectedSIG.set(allOptions);
        } else {
          this.selectedSIG.set([]);
        }
      },
    ),
  );
  onChanged!: (value: any) => void;
  onTouched!: () => void;
  selectedOptionsOnChange$ = this.selectedOptions$.pipe(
    tap((selectedOptions) => {
      this.onChanged(selectedOptions);
      this.onTouched();
    }),
  );

  effectGroupsChanged = this.setSignalGroupsChanges.pipe(
    tap((groups) => {
      console.log(groups);
    }),
  );


  constructor() {
    this.allOptionsEffect.subscribe();
    this.selectedOptionsOnChange$.subscribe();
    this.effectGroupsChanged.subscribe();
  }

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
  id: string | number;

  [key: string]: any;
}
