import { Component, model, output, signal, effect, inject, input, linkedSignal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastMessageComponent } from '@components/toast-message/toast-message.component';
import { TermsAndConditions } from '@interfaces/terms-conditions.interface';
import { ChangeLanguagePipe } from '@pipes/change-language.pipe';
import { ModalService } from '@services/modal.service';
import { TermsConditionsService } from '@services/terms-conditions.service';
import { ToastMessageService } from '@services/toast-message.service';
import { FormErrorLabelComponent } from '@shared/components/form-error-label/form-error-label.component';
import { QuillEditorComponent } from 'ngx-quill';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-license-terms-modal',
  imports: [FormsModule, QuillEditorComponent, ReactiveFormsModule, ChangeLanguagePipe, FormErrorLabelComponent, ToastMessageComponent],
  templateUrl: './license-terms-modal.component.html',
})
export class LicenseTermsModalComponent {


  messageService = inject(ToastMessageService);
  modalService = inject(ModalService);
  termsService = inject(TermsConditionsService);
  fb = inject(FormBuilder);
  inputData = input<TermsAndConditions | null>(null);
  termData = linkedSignal( () => this.inputData());
  // termData = model.required<TermsAndConditions | null>();
  loading = signal(false);
  defaultTerm = signal(false);
  loadingDefault = signal(false);

  // Outputs
  closed = output<TermsAndConditions>();

  termsForm = this.fb.group({
    default: [false],
    title_es: ['', [Validators.required, Validators.minLength(3)]],
    title_en: ['', [Validators.required, Validators.minLength(3)]],
    description_es: ['', [Validators.required, Validators.minLength(3)]],
    description_en: ['', [Validators.required, Validators.minLength(3)]],
  });

  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [
        { align: '' },
        { align: 'center' },
        { align: 'right' },
        { align: 'justify' },
      ],
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      ['link'],
    ],
  };

  termsEffect = effect(() => {
    
    const term = this.termData();
    if (term) {
      this.termsForm.patchValue({
        default: term.default,
        title_es: term.title_es,
        title_en: term.title_en,
        description_es: term.description_es,
        description_en: term.description_en,
      });

      this.defaultTerm.set(term.default!);
    }
  });

  onClose() {
    this.modalService.close('modal-license-terms');
    this.closed.emit(this.termData()!);
    this.termsForm.reset();
  }

  onSubmit() {
    const isValid = this.termsForm.valid;
    this.termsForm.markAllAsTouched();

    if (!isValid) {
      this.messageService.toast({
        originalMessage: 'errors.form_invalid',
        translate: true,
        type: 'error',
      });
      return;
    }

    this.loading.set(true);

    setTimeout(async () => {
      this.loading.set(false);

      const termsValue = this.termsForm.value;

      const termsAndConditionsLike: TermsAndConditions = {
        ...(termsValue as any),
      };

      if (termsAndConditionsLike.default) {
        this.loadingDefault.set(true);
      }
      
      const result = this.termData()?.id ? await this.updateTerm(this.termData()!.id, termsAndConditionsLike) : await this.createTerm(termsAndConditionsLike);

      this.messageService.toast({
        originalMessage: (this.termData()?.id) ? 'terms_condition.table.updated_success' : 'terms_condition.table.created_success',
        translate: true,
      });
      
      this.termData.update((current) => ({
        ...current,
        ...result.data,
      }));

      this.loadingDefault.set(false);

           
    }, 1000);
  }

  // Crear un nuevo término
  private async createTerm(term: TermsAndConditions) {
    return firstValueFrom(this.termsService.createTermsAndConditions(term));
  }

  // Actualizar término existente
  private async updateTerm(termId: number, term: TermsAndConditions) {
    return firstValueFrom(this.termsService.updateTermsAndConditions(termId, term));
  }

  isInvalid(controlName: string, className: string | null = null): boolean | string {
    const control = this.termsForm.get(controlName);
    const hasError = !!(control && control.invalid && control.touched);

    // Si pasas className → retorna la clase si hay error, si no vacío
    if (className !== null) {
      return hasError ? className : '';
    }

    // Si no pasas className → retorna solo el boolean
    return hasError;
  }
}
