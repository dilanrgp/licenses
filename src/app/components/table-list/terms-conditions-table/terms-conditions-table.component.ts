import { SlicePipe } from '@angular/common';
import {
  Component,
  effect,
  inject,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LicenseTermsModalComponent } from '@components/license-terms-modal/license-terms-modal.component';

import { ApiTermsResponse, TermsAndConditions } from '@interfaces/terms-conditions.interface';
import { ChangeLanguagePipe } from '@pipes/change-language.pipe';
import { ModalService } from '@services/modal.service';

@Component({
  selector: 'app-terms-conditions-table',
  imports: [ChangeLanguagePipe, LicenseTermsModalComponent],
  templateUrl: './terms-conditions-table.component.html',
})
export class TermsConditionsTableComponent {

  modalService = inject(ModalService);
  termResponse = input.required<ApiTermsResponse>();
  openModal = input<boolean>();
  closedModal = output<boolean>();
  sanitizer = inject(DomSanitizer);
  
  selectedTerm = signal<TermsAndConditions | null>(null);
  terms = linkedSignal(() => this.termResponse().data);
  
  selectTerm(term: TermsAndConditions) {
    this.selectedTerm.set(term);
  }
  
  modalEffect = effect(() => {
    
    if (this.openModal()) {
      this.selectedTerm.set(null);
    }
    
    const term = this.selectedTerm();

    if (term || this.openModal()) {
      setTimeout(() => {
        this.modalService.open('modal-license-terms');
      }, 500);
    }
  });
  
  clearSelectedTerm(termsAndConditionsInformation: TermsAndConditions) {
    if (termsAndConditionsInformation) {

      this.terms.update((current) => {

        const termIsDefault = termsAndConditionsInformation.default

        let nextList = current.map(term => ({ ...term }));

        if (termIsDefault) {
            nextList = nextList.map(term => ({ ...term, default: false }));
        }

        const idxTerm = nextList.findIndex(term => term.id === termsAndConditionsInformation.id);

        if (idxTerm >= 0) {
          nextList[idxTerm] = { 
            ...nextList[idxTerm], 
            ...termsAndConditionsInformation,
            default: termIsDefault ? true : !!nextList[idxTerm].default,
          };
          
        } else {
          nextList = [
            ...nextList,
            {
              ...termsAndConditionsInformation,
              default: termIsDefault ? true : !!termsAndConditionsInformation.default, // o 1/0
            },
          ];
        }

        return nextList;
      });
    }
    this.closedModal.emit(false);
    this.selectedTerm.set(null);

  }

  sanitizedHtml(descriptionTerm: string): SafeHtml {

    const div = document.createElement('div');
    div.innerHTML = descriptionTerm; // parsear HTML
    let textTerm = div.textContent || div.innerText || '';

    const sliceTerm = textTerm.slice(0, 150) + (textTerm.length > 150 ? '...' : '');

    return this.sanitizer.bypassSecurityTrustHtml(sliceTerm);
  }
}
