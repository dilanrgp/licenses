import { Component, inject, signal, computed } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";

import { License } from "@interfaces/license.interface";
import { LicenseService } from "@services/licenses.service";
import { LicensesTableComponent } from "@components/table-list/licenses-table/licenses-table.component";
import { LocaleService } from "@services/locale.service";
import { PaginationComponent } from "@components/pagination/pagination.component";
import { PaginationService } from "@components/pagination/pagination.service";
import { SkeletonComponent } from "@components/skeleton/skeleton.component";
import { ChangeLanguagePipe } from "@pipes/change-language.pipe";
import { LicenseModalComponent } from "@components/license-modal/license-modal.component";
import { ModalService } from "@services/modal.service";

@Component({
  selector: 'app-licenses',
  imports: [SkeletonComponent, PaginationComponent, LicensesTableComponent, ChangeLanguagePipe, LicenseModalComponent],
  templateUrl: './licenses.component.html',
})
export default class LicensesComponent {
  localeService = inject(LocaleService);
  licenseService = inject(LicenseService);
  routeTitle = inject(ActivatedRoute).snapshot.routeConfig?.path || '';
  paginationService = inject(PaginationService);
  modalService = inject(ModalService);

  selectedLicenses = signal<License[]>([]);
  selectedLicense = signal<License | null>(null);
  updatedLicense = signal<License | null>(null);

  loading = signal(false);
  licenses = signal<License[]>([]);
  pageTitle = computed(() => this.localeService.getCurrentTitle(this.routeTitle));

  licensesResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() }),
    stream: ({ params }) => {
      
      return this.licenseService.getLicenses({
        page: params.page,
      });
    },
  });

  selectLicenseFromTable(license: License) {
    this.selectedLicense.set(license);
    this.modalService.open('modal-license');
  }

  onModalClosed(updated: License) {
    this.updatedLicense.set(null);
    this.updatedLicense.set(updated);
  }
}
