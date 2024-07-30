import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-case-card-dumb',
  standalone: true,
  imports: [],
  templateUrl: './case-card-dumb.component.html',
  styleUrl: './case-card-dumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaseCardDumbComponent {

}
