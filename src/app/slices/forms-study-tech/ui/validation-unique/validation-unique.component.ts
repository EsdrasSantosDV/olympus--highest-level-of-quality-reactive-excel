import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatchPasswordDirective } from '../../utils/match-password.directive';

@Component({
  selector: 'app-validation-unique',
  standalone: true,
  imports: [MatchPasswordDirective,FormsModule,CommonModule],
  templateUrl: './validation-unique.component.html',
  styleUrl: './validation-unique.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationUniqueComponent {
  user = {
    password: '',
    confirmPassword: ''
  };
}


