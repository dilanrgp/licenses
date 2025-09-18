import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function fileSizeMaxMB(maxMB: number): ValidatorFn {
  const maxBytes = maxMB * 1024 * 1024;
  return (control: AbstractControl): ValidationErrors | null => {
    const f = control.value as File | null;
    if (!f) return null;
    return f.size > maxBytes ? { fileSize: { maxMB, actual: f.size } } : null;
  };
}

export function imageMimeTypes(allowed: string[] = ['image/png','image/jpeg','image/webp','image/svg+xml']): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const f = control.value as File | null;
    if (!f) return null;
    return allowed.includes(f.type) ? null : { fileType: { allowed, actual: f.type } };
  };
}