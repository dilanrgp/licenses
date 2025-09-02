import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';
import { LocaleService } from '@services/locale.service';

async function sleep() {
  return new Promise( resolve => {
    setTimeout( () => {
      resolve(true)
    }, 2500);
  })
}

export class FormUtils {
  // Expresiones regulares
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getTextError(errors: ValidationErrors, localeService: LocaleService) {

    const firstKey = Object.keys(errors)[0];
    const error = errors[firstKey];
    console.log("🚀 ~ FormUtils ~ getTextError ~ firstKey:", firstKey)

    switch (firstKey) {
      case 'required':
      case 'email':
      case 'emailTaken':
        return localeService.translate(`validation.${firstKey}`);
      case 'minlength':
      case 'maxlength':
        return localeService.translate(`validation.${firstKey}`, {
          requiredLength: error.requiredLength,
        });
      case 'pattern':
        return localeService.translate('validation.pattern.reg_exp');
      default:
        return localeService.translate('validation.other', { key: firstKey });
    }


    // for (const key of Object.keys(errors)) {
      
    //   switch (key) {
    //     case 'required':
    //       return 'Este campo es requerido';

    //     case 'minlength':
    //       return `Mínimo de ${errors['minlength'].requiredLength} caracteres.`;

    //     case 'min':
    //       return `Valor mínimo de ${errors['min'].min}`;

    //     case 'email':
    //       return `El valor ingresado no es un correo electrónico`;

    //     case 'emailTaken':
    //       return `El correo electrónico ya está siendo usado por otro usuario`;

    //     case 'noStrider':
    //       return `No se puede usar el username de strider en la app`;

    //     case 'pattern':
    //       if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
    //         return 'El valor ingresado no luce como un correo electrónico';
    //       }

    //       return 'Error de patrón contra expresión regular';

    //     default:
    //       return `Error de validación no controlado ${key}`;
    //   }
    // }

    // return null;
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      !!form.controls[fieldName].errors && form.controls[fieldName].touched
    );
  }

  // static getFieldError(form: FormGroup, fieldName: string): string | null {
  //   if (!form.controls[fieldName]) return null;

  //   const errors = form.controls[fieldName].errors ?? {};

  //   return FormUtils.getTextError(errors);
  // }

  // static isValidFieldInArray(formArray: FormArray, index: number) {
  //   return (
  //     formArray.controls[index].errors && formArray.controls[index].touched
  //   );
  // }

  // static getFieldErrorInArray(
  //   formArray: FormArray,
  //   index: number
  // ): string | null {
  //   if (formArray.controls.length === 0) return null;

  //   const errors = formArray.controls[index].errors ?? {};

  //   return FormUtils.getTextError(errors);
  // }

  static isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      return field1Value === field2Value ? null : { passwordsNotEqual: true };
    };
  }

  static async checkingServerResponse(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {
    console.log('Validando contra servidor');

    await sleep(); // 2 segundos y medio

    const formValue = control.value;

    if (formValue === 'hola@mundo.com') {
      return {
        emailTaken: true,
      };
    }

    return null;
  }
}
