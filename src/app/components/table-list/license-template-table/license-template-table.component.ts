import { Component, effect, inject, input, linkedSignal, output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ApiLicenseTemplateResponse, LicenseTemplate } from '@interfaces/license-template.interface';
import { ChangeLanguagePipe } from '@pipes/change-language.pipe';

@Component({
  selector: 'app-license-template-table',
  imports: [ChangeLanguagePipe],
  templateUrl: './license-template-table.component.html',
})
export class LicenseTemplateTableComponent {
  sanitizer = inject(DomSanitizer);

  licenseTemplateData = input.required<ApiLicenseTemplateResponse>();
  updatedTemplate = input<LicenseTemplate | null>();

  licenseTemplates = linkedSignal(() => this.licenseTemplateData().data as LicenseTemplate[]);

  templateSelected = output<LicenseTemplate>();
  newTemplate = output<void>();

  constructor() {
    effect(() => {
      const templateInformation = this.updatedTemplate();
      if (templateInformation) {
        this.updateTemplateList(templateInformation);
      }
    });
  }

  selectTemplate(template: LicenseTemplate) {
    this.templateSelected.emit(template);
  }

  openModalNewLicenseTemplate() {
    this.newTemplate.emit();
  }

  private updateTemplateList(templateInformation: LicenseTemplate) {
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
}
