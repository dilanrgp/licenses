import { Component, inject, signal, computed } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";

import { LocaleService } from "@services/locale.service";
import { PaginationComponent } from "@components/pagination/pagination.component";
import { PaginationService } from "@components/pagination/pagination.service";
import { SkeletonComponent } from "@components/skeleton/skeleton.component";
import { TermsConditionsTableComponent } from "@components/table-list/terms-conditions-table/terms-conditions-table.component";
import { ChangeLanguagePipe } from "@pipes/change-language.pipe";
import { TermsConditionsService } from "@services/terms-conditions.service";
import { TermsAndConditions } from "@interfaces/terms-conditions.interface";
import { LoaderService } from "@services/loader.service";
import { ModalService } from "@services/modal.service";
import { LicenseTermsModalComponent } from "@components/license-terms-modal/license-terms-modal.component";

@Component({
  selector: 'app-terms-conditions',
  imports: [SkeletonComponent, PaginationComponent, TermsConditionsTableComponent, ChangeLanguagePipe, LicenseTermsModalComponent],
  templateUrl: './terms-conditions.component.html',
})
export default class TermsConditionsComponent {
  localeService = inject(LocaleService);
  loaderService = inject(LoaderService);
  termsService = inject(TermsConditionsService);
  paginationService = inject(PaginationService);
  modalService = inject(ModalService);

  routeTitle = inject(ActivatedRoute).snapshot.routeConfig?.path || '';

  selectedTerm = signal<TermsAndConditions | null>(null);
  updatedTerm = signal<TermsAndConditions | null>(null);
  loading = signal(false);
  pageTitle = computed(() => this.localeService.getCurrentTitle(this.routeTitle));

  termsResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() }),
    stream: ({ params }) => {
      
      // this.pageTitle.set();
      return this.termsService.getTermsAndConditions({
        page: params.page,
      });
    },
  });

  openModalNewTerm() {
    this.selectedTerm.set(null);
    this.modalService.open('modal-license-terms');
  }

  selectTermFromTable(term: TermsAndConditions) {
    this.selectedTerm.set(term);
    this.modalService.open('modal-license-terms');
  }

  onModalClosed(updated: TermsAndConditions) {
    this.updatedTerm.set(null);
    this.updatedTerm.set(updated);
  }

  // newTerm(term: TermsAndConditions) {
  //   const modal = document.getElementById(
  //         'modal-license-terms'
  //       ) as HTMLDialogElement;
  //       modal?.showModal();
      
  // }

}

