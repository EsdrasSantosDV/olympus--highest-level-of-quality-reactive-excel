import { Directive, inject, input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTabDirective]',
  standalone: true
})
export class TabDirective {
  tpl = inject(TemplateRef);
  title = input.required<string>({ alias: 'appTabDirective' });
}
