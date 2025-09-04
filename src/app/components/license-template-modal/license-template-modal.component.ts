import { Component, inject, model, output, signal, ViewEncapsulation } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LicenseTemplate } from '@interfaces/license-template.interface';
import { Type } from '@interfaces/type.interface';
import { ChangeLanguagePipe } from '@pipes/change-language.pipe';
import { LicenseTemplateService } from '@services/license-templates.service';
import { FormErrorLabelComponent } from '@shared/components/form-error-label/form-error-label.component';
import { firstValueFrom, of } from 'rxjs';
import { ToastMessageService } from '@services/toast-message.service';
import { TinyEditorComponent } from '@shared/components/tiny-editor/tiny-editor.component';

@Component({
  selector: 'app-license-template-modal',
  imports: [ChangeLanguagePipe, FormsModule, ReactiveFormsModule, FormErrorLabelComponent, TinyEditorComponent],
  templateUrl: './license-template-modal.component.html'
})
export class LicenseTemplateModalComponent {

  licenseTemplateService = inject(LicenseTemplateService);
  fb = inject(FormBuilder);
  messageService = inject(ToastMessageService);
  
  templateData = model.required<LicenseTemplate | null>();
  editorData = signal('<p>Hola, prueba CKEditor con tablas!</p>');

  loading = signal(false);
  types = signal<Type[]>([]);

  // Outputs
  closed = output<LicenseTemplate>();

  templateForm = this.fb.group({
    type_id: [1, [Validators.required]],
    title: ['', [Validators.required, Validators.minLength(3)]],
    logo: ['', [Validators.required]],
    content: ['', [Validators.required]],
    active: [0, [Validators.required]],
  });

  licensesTemplateResource = rxResource({
    params: () => ({ template: this.templateData() }),
    stream: ({ params }) => {

      this.loadTypes();
      
      console.log("🚀 ~ LicenseTemplatesModalComponent ~ params.template:", params.template)
      if (params.template) {
          this.templateForm.patchValue({
            type_id: params.template.type_id!,
            title: params.template.title,
            logo: params.template.logo,
            content: params.template.content,
            active: params.template.active,
          });

          // this.defaultTerm.set(term.default!);
      }
      

      return of([]);
      

    },
  });

  private loadTypes(): void {

    this.licenseTemplateService.getTypes()
      .subscribe({
        next: (response) => {
          this.types.set(response.data);
        },
        error: () => {
          this.types.set([]);
        }
      });
  }

  // templateEffect = effect(() => {
  //   const term = this.termData();
  //   if (term) {
  //     this.termsForm.patchValue({
  //       default: term.default,
  //       title_es: term.title_es,
  //       title_en: term.title_en,
  //       description_es: term.description_es,
  //       description_en: term.description_en,
  //     });

  //     this.defaultTerm.set(term.default!);
  //   }
  // });

  onSubmit() {
    const isValid = this.templateForm.valid;
    this.templateForm.markAllAsTouched();

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

      const licenseTemplateValue = this.templateForm.value;

      const licenseTemplateLike: LicenseTemplate = {
        ...(licenseTemplateValue as any),
      };

      const result = this.templateData()?.id ? await this.updateTerm(this.templateData()!.id, licenseTemplateLike) : await this.createTerm(licenseTemplateLike);

      this.messageService.toast({
        originalMessage: (this.templateData()?.id) ? 'terms_condition.table.updated_success' : 'terms_condition.table.created_success',
        translate: true,
      });
      
      this.templateData.update((current) => ({
        ...current,
        ...result.data,
      }));

    }, 1000);
  }

   // Crear un nuevo término
    private async createTerm(template: LicenseTemplate) {
      return firstValueFrom(this.licenseTemplateService.createTermsAndConditions(template));
    }
  
    // Actualizar término existente
    private async updateTerm(templateId: number, template: LicenseTemplate) {
      return firstValueFrom(this.licenseTemplateService.updateTermsAndConditions(templateId, template));
    }

  
  onClose() {
    const modal = document.getElementById(
      'modal-license-template'
    ) as HTMLDialogElement;
    modal.close();
    let overlay = document.getElementById('modal-overlay') as HTMLDivElement;
    overlay.classList.add('overlay-hidden');
    this.closed.emit(this.templateData()!);
    this.templateForm.reset();
  }

  isInvalid(controlName: string, className: string | null = null): boolean | string {
    const control = this.templateForm.get(controlName);
    const hasError = !!(control && control.invalid && control.touched);

    // Si pasas className → retorna la clase si hay error, si no vacío
    if (className !== null) {
      return hasError ? className : '';
    }

    // Si no pasas className → retorna solo el boolean
    return hasError;
  }
}
