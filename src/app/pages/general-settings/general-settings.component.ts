import { Component, computed, inject, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { LoaderService } from "@services/loader.service";
import { LocaleService } from "@services/locale.service";
import { SkeletonComponent } from "@components/skeleton/skeleton.component";
import { LicenseTemplateTableComponent } from "@components/table-list/license-template-table/license-template-table.component";
import { ChangeLanguagePipe } from "@pipes/change-language.pipe";
import { rxResource } from "@angular/core/rxjs-interop";
import { PaginationService } from "@components/pagination/pagination.service";
import { LicenseTemplateService } from "@services/license-templates.service";
import { PaginationComponent } from "@components/pagination/pagination.component";
import { LicenseTemplateModalComponent } from "@components/license-template-modal/license-template-modal.component";
import { LicenseTemplate } from "@interfaces/license-template.interface";
import { ModalService } from "@services/modal.service";


@Component({
  selector: 'app-general-settings',
  imports: [
    SkeletonComponent,
    LicenseTemplateTableComponent,
    ChangeLanguagePipe,
    PaginationComponent,
    LicenseTemplateModalComponent,
  ],
  templateUrl: './general-settings.component.html',
})
export default class GeneralSettingsComponent {

  paginationService = inject(PaginationService);
  licenseTemplateService = inject(LicenseTemplateService);
  localeService = inject(LocaleService);
  loaderService = inject(LoaderService);
  modalService = inject(ModalService);
  routeTitle = inject(ActivatedRoute).snapshot.routeConfig?.path || '';

  loading = signal(true);
  pageTitle = computed(() => this.localeService.getCurrentTitle(this.routeTitle));

  selectedTemplate = signal<LicenseTemplate | null>(null);
  updatedTemplate = signal<LicenseTemplate | null>(null);

  licensesTemplateResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() }),
    stream: ({ params }) => {
      
      return this.licenseTemplateService.getLicenseTemplates({
        page: params.page,
      });
    },
  });


  constructor() {
    setTimeout(() => {
      this.loading.set(false);
    }, 500);
  }

  selectTemplateFromTable(template: LicenseTemplate) {
    this.selectedTemplate.update(() => template);
    this.modalService.open('modal-license-template');
  }

  openModalNewTemplate(event: boolean) {
    console.log("🚀 ~ GeneralSettingsComponent ~ openModalNewTemplate ~ event:", event)
    this.selectedTemplate.set(null);
    this.modalService.open('modal-license-template');
  }

  onModalClosed(template: LicenseTemplate) {
    this.updatedTemplate.set(null);
    this.updatedTemplate.set(template);
  }
}
