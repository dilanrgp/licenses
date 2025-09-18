import { Component, inject, input, linkedSignal, output, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LicenseTemplate } from '@interfaces/license-template.interface';
import { Type } from '@interfaces/type.interface';
import { ChangeLanguagePipe } from '@pipes/change-language.pipe';
import { LicenseTemplateService } from '@services/license-templates.service';
import { FormErrorLabelComponent } from '@shared/components/form-error-label/form-error-label.component';
import { firstValueFrom, forkJoin, map, of, tap } from 'rxjs';
import { ToastMessageService } from '@services/toast-message.service';
import { TinyEditorComponent } from '@shared/components/tiny-editor/tiny-editor.component';
import { ModalService } from '@services/modal.service';
import { Keyword } from '@interfaces/keywords.interface';
import { ToastMessageComponent } from '@components/toast-message/toast-message.component';

@Component({
  selector: 'app-license-template-modal',
  imports: [ChangeLanguagePipe, FormsModule, ReactiveFormsModule, FormErrorLabelComponent, TinyEditorComponent, ToastMessageComponent],
  templateUrl: './license-template-modal.component.html'
})
export class LicenseTemplateModalComponent {

  licenseTemplateService = inject(LicenseTemplateService);
  modalService = inject(ModalService);
  fb = inject(FormBuilder);
  messageService = inject(ToastMessageService);
  
  inputTemplateData = input<LicenseTemplate | null>(null);
  templateData = linkedSignal( () => this.inputTemplateData());

  loading = signal(false);
  types = signal<Type[]>([]);
  urlLogo = signal<string | null>(null);
  logoPath = signal<string | null>(null);

  keywords = signal<Keyword[]>([]);

  // Outputs
  closed = output<LicenseTemplate>();

  templateForm = this.fb.group({
    type_id: [1, [Validators.required]],
    title: ['', [Validators.required, Validators.minLength(3)]],
    logo: [null as File | null, []],
    content: ['', [Validators.required]],
    active: [0, [Validators.required]],
  });


  typesResource = rxResource({
    params: () => ({ template: this.templateData() }),
    stream: ({ params }) => {

      const types$ = this.licenseTemplateService.getTypes();
      const keywords$ = this.licenseTemplateService.getKeywords();

      return forkJoin({ types: types$, keywords: keywords$ }).pipe(
        tap(({ keywords }) => {
          
          if (params.template) {
            
            this.templateForm.patchValue({
              type_id: params.template.type_id!,
              title: params.template.title,
              content: params.template.content,
              active: params.template.active,
            });

            const fileName = params.template.logo?.split('/').pop() ?? '';
            const logoUrl = this.licenseTemplateService.getUrlLogoTemplate(fileName);
            this.urlLogo.set(logoUrl);
            this.logoPath.set(params.template.logo);

            this.keywords.set(keywords);
          }
        }),
        map(({ types }) => types)
      );
    },
  });

  copyKeyword(textToCopy: string){
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(`{{${textToCopy}}}`).then(() => {
        this.messageService.toast({ originalMessage: 'license_template.modal.keyword_copied', translate: true });
      }).catch(err => {
        this.messageService.toast({ originalMessage: 'license_template.modal.keyword_copied_error', translate: true });
      });
    } else {
      this.messageService.toast({ originalMessage: 'license_template.modal.keyword_copied_not_supported', translate: true });
    }
  }

  onSubmit() {
    this.loading.set(true);
    const isValid = this.templateForm.valid;
    this.templateForm.markAllAsTouched();
    
    if (!isValid) {
      this.messageService.toast({
        originalMessage: 'errors.form_invalid',
        translate: true,
        type: 'error',
      });
      this.loading.set(false);
      return;
    }

    setTimeout(async () => {

      const licenseTemplateValue = this.templateForm.value;

      const licenseTemplateLike: LicenseTemplate = {
        ...(licenseTemplateValue as any),
        logo_path: this.logoPath()
      };

      const result = this.templateData()?.id ? await this.updateTerm(this.templateData()!.id, licenseTemplateLike) : await this.createTerm(licenseTemplateLike);

      this.messageService.toast({
        originalMessage: (this.templateData()?.id) ? 'common.updated_success' : 'common.created_success',
        translate: true,
      });
      
      this.templateData.update((current) => ({
        ...current,
        ...result.data,
      }));

      this.loading.set(false);

    }, 1000);
  }

  private async createTerm(template: LicenseTemplate) {
    const logoFile = this.templateForm.get('logo')?.value as File | null;
    return firstValueFrom(this.licenseTemplateService.createTemplate(template, logoFile));
  }
  
  private async updateTerm(templateId: number, template: LicenseTemplate) {
    const logoFile = this.templateForm.get('logo')?.value as File | null;
    return firstValueFrom(this.licenseTemplateService.updateTemplate(templateId, template, logoFile));
  }

  onLogoSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;
    
    this.templateForm.get('logo')?.setValue(file);
    this.templateForm.get('logo')?.markAsTouched();

  }

  removeLogo() {
    this.templateForm.get('logo')?.setValue(null);
    this.urlLogo.set(null);
    this.logoPath.set(null);
  }

  onClose() {
    this.modalService.close('modal-license-template');
    this.closed.emit(this.templateData()!);
    this.templateForm.reset();
  }

  isInvalid(controlName: string, className: string | null = null): boolean | string {
    const control = this.templateForm.get(controlName);
    const hasError = !!(control && control.invalid && control.touched);

    if (className !== null) {
      return hasError ? className : '';
    }

    return hasError;
  }
}
