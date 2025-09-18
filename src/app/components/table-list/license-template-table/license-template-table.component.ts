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
    
    templateResponse = input.required<ApiLicenseTemplateResponse>();
    updatedTemplate = input<LicenseTemplate | null>();
    
    templateSelected = output<LicenseTemplate>();
    templateNew = output<boolean>();
    
    licenseTemplates = linkedSignal(() => this.templateResponse().data);
  
    updateEffect = effect(() => {
      const template = this.updatedTemplate();
      if (template) {
        this.updateTemplateList(template);
      }
    });
  
    selectTemplate(template: LicenseTemplate) {
      this.templateSelected.emit(template);
    }

    getActive(active: number) {
      return (active == 1) ? 'common.yes' : 'common.not';
    }
  
    updateTemplateList(templateInformation: LicenseTemplate) {
      if (templateInformation) {
  
        this.licenseTemplates.update((current) => {

          let nextList = current.map(template => ({ ...template }));
  
          const idxTemplate = nextList.findIndex(template => template.id === templateInformation.id);
  
          if (idxTemplate >= 0) {
            nextList[idxTemplate] = {
              ...nextList[idxTemplate],
              ...templateInformation,
            };
  
          } else {
            nextList = [
              ...nextList,
              {
                ...templateInformation,
              },
            ];
          }
  
          return nextList;
        });
      }
    }
  
    sanitizedHtml(descriptionTemplate: string): SafeHtml {
  
      const div = document.createElement('div');
      div.innerHTML = descriptionTemplate; // parsear HTML
      let textTemplate = div.textContent || div.innerText || '';
  
      const sliceTemplate = textTemplate.slice(0, 100) + (textTemplate.length > 100 ? '...' : '');
  
      return this.sanitizer.bypassSecurityTrustHtml(sliceTemplate);
    }
  
    openModalNewTemplate(){
      this.templateNew.emit(true);
    }
}
