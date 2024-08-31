import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-one-template-driven',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './one-template-driven.component.html',
  styleUrl: './one-template-driven.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OneTemplateDrivenComponent {

  

}
