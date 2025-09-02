import { Component, inject, input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { LocaleService } from '@services/locale.service';
import { FormUtils } from '@utils/forms-utils';

@Component({
  selector: 'form-error-label',
  imports: [],
  templateUrl: './form-error-label.component.html',
})
export class FormErrorLabelComponent { 

  private localeService = inject(LocaleService);
  control = input.required<AbstractControl>();

  get errorMessage() {
    const errors: ValidationErrors = this.control().errors || {};

    return this.control().touched && Object.keys(errors).length > 0
      ? FormUtils.getTextError(errors, this.localeService)
      : null;
  }
}
