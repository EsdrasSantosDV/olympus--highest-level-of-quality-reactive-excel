import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exercise-one',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './exercise-one.component.html',
  styleUrl: './exercise-one.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseOneComponent {
  customer = {
    name: '',
    email: '',
    phone: '',
    address: ''
  };

  name=signal('');

  email=signal('');

  phone=signal('');

  adress=signal('')

  formValues=computed(()=>{
    const name=this.name();
    const phone=this.phone();
    const adress=this.adress();
    const email=this.email();

    return {
      name,
      phone,adress,
      email
    }
  })

  onSubmit(form: any) {

  }
}
