import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[uniqueUsername]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: UniqueUsernameDirective,
    multi: true
  }],
  standalone:true
})
export class UniqueUsernameDirective implements Validator {
  existingUsernames = ['Esdras Santos', 'Pedro'];

  validate(control: AbstractControl): ValidationErrors | null {
    const username = control.value;
    if (this.existingUsernames.includes(username)) {
      return { 'usernameTaken': true };
    }
    return null;
  }
}
