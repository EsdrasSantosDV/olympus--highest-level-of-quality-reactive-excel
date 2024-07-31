import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-multi-slot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './multi-slot.component.html',
  styleUrl: './multi-slot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiSlotComponent {

}
