import { Component, effect, inject, input, linkedSignal, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LicenseTemplateModalComponent } from '@components/license-template-modal/license-template-modal.component';
import { ApiLicenseTemplateResponse, LicenseTemplate } from '@interfaces/license-template.interface';
import { ChangeLanguagePipe } from '@pipes/change-language.pipe';

@Component({
  selector: 'app-license-template-table',
  imports: [ChangeLanguagePipe, LicenseTemplateModalComponent],
  templateUrl: './license-template-table.component.html',
})
export class LicenseTemplateTableComponent {
  
  sanitizer = inject(DomSanitizer);

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
        const modal = document.getElementById(
          'modal-license-template'
        ) as HTMLDialogElement;
        modal?.show();
        if (modal) {
          let overlay = document.getElementById('modal-overlay') as HTMLDivElement;
          overlay.classList.remove('overlay-hidden');
        }
      }, 2);
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
