import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-case-accordion-item-dumb',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './case-accordion-item-dumb.component.html',
  styleUrl: './case-accordion-item-dumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaseAccordionItemDumbComponent {
  isOpenSIG = signal(false)
  toggle() {
    this.isOpenSIG.update((value)=>!value)
  }
}
