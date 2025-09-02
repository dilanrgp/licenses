import { Component, inject, signal, computed } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";

import { License } from "@interfaces/license.interface";
import { LicenseService } from "@services/licenses.service";
import { LicensesTableComponent } from "@components/table-list/licenses-table/licenses-table.component";
import { LoaderComponent } from "@components/loader/loader.component";
import { LocaleService } from "@services/locale.service";
import { PaginationComponent } from "@components/pagination/pagination.component";
import { PaginationService } from "@components/pagination/pagination.service";
import { SkeletonComponent } from "@components/skeleton/skeleton.component";
import { ChangeLanguagePipe } from "@pipes/change-language.pipe";

@Component({
  selector: 'app-licenses',
  imports: [SkeletonComponent, PaginationComponent, LicensesTableComponent, ChangeLanguagePipe],
  templateUrl: './licenses.component.html',
})
export default class LicensesComponent {
  localeService = inject(LocaleService);
  licenseService = inject(LicenseService);
  routeTitle = inject(ActivatedRoute).snapshot.routeConfig?.path || '';
  paginationService = inject(PaginationService);
  selectedLicenses = signal<License[]>([]);

  loading = signal(false);
  licenses = signal<License[]>([]);
  pageTitle = computed( () => this.localeService.getCurrentTitle(this.routeTitle));
  

  licensesResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() }),
    stream: ({ params }) => {
      
      return this.licenseService.getLicenses({
        page: params.page,
      });
    },
  });

  // showModal(license: License) {
  //   this.selectedLicense.set(license);
  //   // Esperar un tick para que el modal se renderice
  //   setTimeout(() => {
  //     const modal = document.getElementById(
  //       'modal-license'
  //     ) as HTMLDialogElement;
  //     if (modal) modal.showModal();
  //   }, 1);
  // }

  // onModalClosed() {
  //   console.log('Hola');
  //   this.selectedLicense.set(null); // limpiar si necesitas
  // }
}
