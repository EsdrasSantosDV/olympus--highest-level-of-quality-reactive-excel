import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cel-table',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './cel-table.component.html',
  styleUrl: './cel-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CelTableComponent {
  celValue=model<number | null>();

  isEditable=input<boolean>(true);

  isEditing= signal<boolean>(false);

  toggleEdit(): void {
    this.isEditing.update((v)=>!v);
  }
}
