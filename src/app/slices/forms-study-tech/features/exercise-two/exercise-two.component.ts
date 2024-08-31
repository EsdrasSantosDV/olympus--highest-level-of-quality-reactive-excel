import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatchPasswordDirective } from '../../utils/match-password.directive';
import { UniqueUsernameDirective } from '../../utils/unique-user-name.directive';

@Component({
  selector: 'app-exercise-two',
  standalone: true,
  imports: [FormsModule, CommonModule,MatchPasswordDirective,UniqueUsernameDirective],
  templateUrl: './exercise-two.component.html',
  styleUrl: './exercise-two.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseTwoComponent {


  username=signal('');

  password=signal('');

  confirmPassword=signal('');

onSubmit(_t6: NgForm) {
throw new Error('Method not implemented.');
}

}
