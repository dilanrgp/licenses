import { Component, computed, inject, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { License } from "@interfaces/license.interface";
import { LoaderService } from "@services/loader.service";
import { LocaleService } from "@services/locale.service";
import { SkeletonComponent } from "@components/skeleton/skeleton.component";
import { LicenseTemplateTableComponent } from "@components/table-list/license-template-table/license-template-table.component";
import { ChangeLanguagePipe } from "@pipes/change-language.pipe";
import { rxResource } from "@angular/core/rxjs-interop";
import { PaginationService } from "@components/pagination/pagination.service";
import { LicenseTemplateService } from "@services/license-templates.service";
import { PaginationComponent } from "@components/pagination/pagination.component";


@Component({
  selector: 'app-general-settings',
  imports: [SkeletonComponent, LicenseTemplateTableComponent, ChangeLanguagePipe, PaginationComponent],
  templateUrl: './general-settings.component.html',
})
export default class GeneralSettingsComponent { 

  paginationService = inject(PaginationService);
  licenseTemplateService = inject(LicenseTemplateService);
  localeService = inject(LocaleService);
  loaderService = inject(LoaderService);
  routeTitle = inject(ActivatedRoute).snapshot.routeConfig?.path || '';
  
  loading = signal(true);
  licenses = signal<License[]>([]);
  pageTitle = computed( () => this.localeService.getCurrentTitle(this.routeTitle));


  licensesTemplateResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() }),
    stream: ({ params }) => {
      
      return this.licenseTemplateService.getLicenseTemplates({
        page: params.page,
      });
    },
  });


  constructor(){
    setTimeout(() => {
      this.loading.set(false)
    }, 500);

  }

 }
