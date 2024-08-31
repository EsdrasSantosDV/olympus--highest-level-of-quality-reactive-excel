import { Directive } from '@angular/core';
import {  Validator, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[matchPassword]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MatchPasswordDirective,
    multi: true
  }],
  standalone:true
})
export class MatchPasswordDirective implements Validator {

  validate(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password && confirmPassword && password !== confirmPassword ? { 'passwordMismatch': true } : null;
  }
}
