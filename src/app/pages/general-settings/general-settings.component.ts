import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LoaderService } from '@services/loader.service';
import { LocaleService } from '@services/locale.service';
import { SkeletonComponent } from '@components/skeleton/skeleton.component';
import { LicenseTemplateTableComponent } from '@components/table-list/license-template-table/license-template-table.component';
import { ChangeLanguagePipe } from '@pipes/change-language.pipe';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginationService } from '@components/pagination/pagination.service';
import { LicenseTemplateService } from '@services/license-templates.service';
import { PaginationComponent } from '@components/pagination/pagination.component';
import { LicenseTemplateModalComponent } from '@components/license-template-modal/license-template-modal.component';
import { LicenseTemplate } from '@interfaces/license-template.interface';
import { ModalService } from '@services/modal.service';
import { TermsAndConditions } from '@interfaces/terms-conditions.interface';
import { TermsConditionsTableComponent } from '@components/table-list/terms-conditions-table/terms-conditions-table.component';
import { TermsConditionsService } from '@services/terms-conditions.service';
import { LicenseTermsModalComponent } from '@components/license-terms-modal/license-terms-modal.component';
import { EmailBodyService } from '@services/email-body.service';
import { EmailBody } from '@interfaces/email-body.interface';
import { EmailBodyTableComponent } from '@components/table-list/email-body-table/email-body-table.component';
import { EmailBodyModalComponent } from '@components/email-body-modal/email-body-modal.component';

@Component({
  selector: 'app-general-settings',
  imports: [ SkeletonComponent, LicenseTemplateTableComponent, ChangeLanguagePipe, PaginationComponent, TermsConditionsTableComponent, LicenseTermsModalComponent, EmailBodyTableComponent, EmailBodyModalComponent, LicenseTemplateModalComponent ],
  templateUrl: './general-settings.component.html',
})
export default class GeneralSettingsComponent {
  paginationService = inject(PaginationService);
  localeService = inject(LocaleService);
  loaderService = inject(LoaderService);
  modalService = inject(ModalService);
  routeTitle = inject(ActivatedRoute).snapshot.routeConfig?.path || '';

  // EMAIL BODIES
  emailBodiesService = inject(EmailBodyService);
  selectedEmailBody = signal<EmailBody | null>(null);
  updatedEmailBody = signal<EmailBody | null>(null);

  // TERMS AND CONDITIONS
  termsService = inject(TermsConditionsService);
  selectedTerm = signal<TermsAndConditions | null>(null);
  updatedTerm = signal<TermsAndConditions | null>(null);

  // TEMPLATES
  licenseTemplateService = inject(LicenseTemplateService);
  selectedTemplate = signal<LicenseTemplate | null>(null);
  updatedTemplate = signal<LicenseTemplate | null>(null);


  loading = signal(true);
  pageTitle = computed(() =>
    this.localeService.getCurrentTitle(this.routeTitle)
  );

  emailBodiesResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() }),
    stream: ({ params }) => {
      return this.emailBodiesService.getEmailBodies({
        page: params.page,
      });
    },
  });

  licensesTemplateResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() }),
    stream: ({ params }) => {
      return this.licenseTemplateService.getLicenseTemplates({
        page: params.page,
      });
    },
  });

  licensesTermsResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() }),
    stream: ({ params }) => {
      return this.termsService.getTermsAndConditions({
        page: params.page,
      });
    },
  });

  constructor() {
    setTimeout(() => {
      this.loading.set(false);
    }, 500);
  }


  // EMAIL BODIES
  selectEmailBodyFromTable(emailBody: EmailBody) {
    this.selectedEmailBody.set(emailBody);
    this.modalService.open('modal-email-body');
  }

  onModalEmailBodyClosed(updated: EmailBody) {
    this.updatedEmailBody.set(null);
    this.updatedEmailBody.set(updated);
  }

  // TEMPLATES
  selectTemplateFromTable(template: LicenseTemplate) {
    this.selectedTemplate.set(template);
    this.modalService.open('modal-license-template');
  }

  openModalNewTemplate() {
    this.selectedTemplate.set(null);
    this.modalService.open('modal-license-template');
  }

  onModalTemplateClosed(template: LicenseTemplate) {
    this.updatedTemplate.set(null);
    this.updatedTemplate.set(template);
  }

  // TERMS AND CONDITIONS
  selectTermFromTable(term: TermsAndConditions) {
    this.selectedTerm.set(term);
    this.modalService.open('modal-license-terms');
  }

  onModalTermsClosed(term: TermsAndConditions) {
    this.updatedTerm.set(null);
    this.updatedTerm.set(term);
  }

  openModalNewTerm() {
    this.selectedTerm.set(null);
    this.modalService.open('modal-license-terms');
  }
}
