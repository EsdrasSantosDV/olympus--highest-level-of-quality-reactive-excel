import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-single-slot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-slot.component.html',
  styleUrl: './single-slot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleSlotComponent {

}
