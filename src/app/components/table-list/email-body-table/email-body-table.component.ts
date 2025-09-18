import { Component, effect, inject, input, linkedSignal, output, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ApiEmailBodiesResponse, EmailBody } from '@interfaces/email-body.interface';
import { ChangeLanguagePipe } from '@pipes/change-language.pipe';

@Component({
  selector: 'app-email-body-table',
  imports: [ChangeLanguagePipe],
  templateUrl: './email-body-table.component.html',
})
export class EmailBodyTableComponent {

  sanitizer = inject(DomSanitizer);


  emailBodyResponse = input.required<ApiEmailBodiesResponse>();
  emailBodies = linkedSignal(() => this.emailBodyResponse().data as EmailBody[]);

  selectedemailBody = signal<EmailBody | null>(null);

  updatedEmailBody = input<EmailBody | null>();

  emailBodySelected = output<EmailBody>();


  updateEffect = effect(() => {
    const term = this.updatedEmailBody();
    if (term) {
      this.updateEmailBodyList(term);
    }
  });

  selectEmailBody(template: EmailBody) {
    this.emailBodySelected.emit(template);
  }

  getActive(active: boolean) {
    return (active) ? 'common.yes' : 'common.not';
  }

  updateEmailBodyList(emailBodyInformation: EmailBody) {
      if (emailBodyInformation) {
  
        this.emailBodies.update((current) => {
  
          let nextList = current.map(emailBody => ({ ...emailBody }));
          const idxEmailBody = nextList.findIndex(emailBody => emailBody.id === emailBodyInformation.id);
  
          if (idxEmailBody >= 0) {
            nextList[idxEmailBody] = {
              ...nextList[idxEmailBody],
              ...emailBodyInformation,
            };
  
          } else {
            nextList = [
              ...nextList,
              {
                ...emailBodyInformation,
              },
            ];
          }
  
          return nextList;
        });
      }
    }

  sanitizedHtml(stringContent: string, maxLength = 100): SafeHtml {

    const div = document.createElement('div');
    div.innerHTML = stringContent; // parsear HTML
    let textTerm = div.textContent || div.innerText || '';

    const sliceTerm = textTerm.slice(0, maxLength) + (textTerm.length > maxLength ? '...' : '');

    return this.sanitizer.bypassSecurityTrustHtml(sliceTerm);
  }


 }
