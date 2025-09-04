import {
  Component,
  inject,
  input,
  linkedSignal,
  output,
  effect,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { ApiTermsResponse, TermsAndConditions } from '@interfaces/terms-conditions.interface';
import { ChangeLanguagePipe } from '@pipes/change-language.pipe';

@Component({
  selector: 'app-terms-conditions-table',
  imports: [ChangeLanguagePipe],
  templateUrl: './terms-conditions-table.component.html',
})
export class TermsConditionsTableComponent {

  termResponse = input.required<ApiTermsResponse>();
  termSelected = output<TermsAndConditions>();
  updatedTerm = input<TermsAndConditions | null>();
  sanitizer = inject(DomSanitizer);

  terms = linkedSignal(() => this.termResponse().data);

  constructor() {
    effect(() => {
      const term = this.updatedTerm();
      if (term) {
        this.updateTermsList(term);
      }
    });
  }

  selectTerm(term: TermsAndConditions) {
    this.termSelected.emit(term);
  }

  updateTermsList(termsAndConditionsInformation: TermsAndConditions) {
    if (termsAndConditionsInformation) {

      this.terms.update((current) => {

        const termIsDefault = termsAndConditionsInformation.default;

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
  }

  sanitizedHtml(descriptionTerm: string): SafeHtml {

    const div = document.createElement('div');
    div.innerHTML = descriptionTerm; // parsear HTML
    let textTerm = div.textContent || div.innerText || '';

    const sliceTerm = textTerm.slice(0, 150) + (textTerm.length > 150 ? '...' : '');

    return this.sanitizer.bypassSecurityTrustHtml(sliceTerm);
  }
}

