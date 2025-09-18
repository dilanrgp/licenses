import { Component, effect, inject, input, linkedSignal, output, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastMessageComponent } from '@components/toast-message/toast-message.component';
import { EmailBody } from '@interfaces/email-body.interface';
import { ChangeLanguagePipe } from '@pipes/change-language.pipe';
import { EmailBodyService } from '@services/email-body.service';
import { ModalService } from '@services/modal.service';
import { ToastMessageService } from '@services/toast-message.service';
import { FormErrorLabelComponent } from '@shared/components/form-error-label/form-error-label.component';
import { QuillEditorComponent } from 'ngx-quill';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-email-body-modal',
  imports: [ChangeLanguagePipe, FormsModule, ReactiveFormsModule, FormErrorLabelComponent, QuillEditorComponent, ToastMessageComponent],
  templateUrl: './email-body-modal.component.html',
})
export class EmailBodyModalComponent { 

  fb = inject(FormBuilder);
  modalService = inject(ModalService);
  messageService = inject(ToastMessageService);
  emailBodyService = inject(EmailBodyService);

  inputEmailBodyData = input<EmailBody | null>(null);
  emailBodyData = linkedSignal( () => this.inputEmailBodyData());

  // Outputs
  closed = output<EmailBody>();

  loading = signal(false);

  emailBodyForm = this.fb.group({
    description: ['', [Validators.required, Validators.minLength(3)]],
    template: ['', [Validators.required, Validators.minLength(3)]],
    content: ['', [Validators.required, Validators.minLength(3)]],
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

  emailBodyEffect = effect(() => {
    
    const emailBody = this.emailBodyData();
    if (emailBody) {
      this.emailBodyForm.patchValue({
        description: emailBody.description,
        template: emailBody.template,
        content: emailBody.content,
      });

    }
  });

  onSubmit() {
      const isValid = this.emailBodyForm.valid;
      this.emailBodyForm.markAllAsTouched();
  
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
  
        const emailBodyValue = this.emailBodyForm.value;
  
        const emailBodyLike: EmailBody = {
          ...(emailBodyValue as any),
        };
  
        const result = await this.updateEmailBody(this.emailBodyData()!.id, emailBodyLike);
  
        this.messageService.toast({
          originalMessage: 'common.updated_success',
          translate: true,
        });
        
        this.emailBodyData.update((current) => ({
          ...current,
          ...result.data,
        }));
  
      }, 1000);
    }

  onClose() {
    this.modalService.close('modal-email-body');
    this.closed.emit(this.emailBodyData()!);
    this.emailBodyForm.reset();
  }

  isInvalid(controlName: string, className: string | null = null): boolean | string {
    const control = this.emailBodyForm.get(controlName);
    const hasError = !!(control && control.invalid && control.touched);

    // Si pasas className → retorna la clase si hay error, si no vacío
    if (className !== null) {
      return hasError ? className : '';
    }

    // Si no pasas className → retorna solo el boolean
    return hasError;
  }

  // Actualizar
    private async updateEmailBody(emailBodyId: number, emailBody: EmailBody) {
      return firstValueFrom(this.emailBodyService.updateEmailBody(emailBodyId, emailBody));
    }

}
