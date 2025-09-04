import { Component, effect, inject, input, linkedSignal, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LicenseTemplateModalComponent } from '@components/license-template-modal/license-template-modal.component';
import { ApiLicenseTemplateResponse, LicenseTemplate } from '@interfaces/license-template.interface';
import { ChangeLanguagePipe } from '@pipes/change-language.pipe';
import { ModalService } from '@services/modal.service';

@Component({
  selector: 'app-license-template-table',
  imports: [ChangeLanguagePipe, LicenseTemplateModalComponent],
  templateUrl: './license-template-table.component.html',
})
export class LicenseTemplateTableComponent {
  
  sanitizer = inject(DomSanitizer);
  modalService = inject(ModalService);

  licenseTemplateData = input.required<ApiLicenseTemplateResponse>();
  licenseTemplates = linkedSignal(() => this.licenseTemplateData().data as LicenseTemplate[]);
  openModal = signal(false);
  selectedTemplate = signal<LicenseTemplate | null>(null);

  modalEffect = effect(() => {

    if (this.openModal()) {
      this.selectedTemplate.set(null);
    }
    
    const licenseTemplate = this.selectedTemplate();
    
    if (licenseTemplate || this.openModal()) {
      setTimeout(() => {
        this.modalService.open('modal-license-template');
      }, 500);
    }
  });

  selectTemplate(template: LicenseTemplate) {
    this.selectedTemplate.set(template);
  }

  getActive(active: number) {
    return (active == 1) ? 'common.yes' : 'common.not';
  }

  sanitizedHtml(stringContent: string): SafeHtml {

    const div = document.createElement('div');
    div.innerHTML = stringContent; // parsear HTML
    let textTerm = div.textContent || div.innerText || '';

    const sliceTerm = textTerm.slice(0, 100) + (textTerm.length > 100 ? '...' : '');

    return this.sanitizer.bypassSecurityTrustHtml(sliceTerm);
  }

  clearSelectedTemplate(templateInformation: LicenseTemplate) {
  
      if (templateInformation) {
  
        this.licenseTemplates.update((current) => {
  
          const index = current.findIndex((term) => term.id === templateInformation.id);
  
          if (index >= 0) {
            current[index] = { ...current[index], ...templateInformation };
            return [...current];
          } else {
            return [...current, templateInformation];
          }
        });
      }
      
      this.selectedTemplate.set(null);
    }


  openModalNewLicenseTemplate(){
    this.openModal.set(true);
  }
}
