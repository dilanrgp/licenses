import { Component, input, linkedSignal, computed } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ApiResponse } from "@interfaces/api-response.interface";

import { ChangeLanguagePipe } from "@pipes/change-language.pipe";

@Component({
  selector: 'app-pagination',
  imports: [ChangeLanguagePipe, RouterLink],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent { 

  paginationData = input.required<ApiResponse>();
  
  activePage = linkedSignal(() => this.paginationData().current_page);
  showExtraButtons = computed(() => this.paginationData().last_page >= 5 ? true : false);

  readonly isFirstPage = computed(() => !this.paginationData().links[0].url);
  readonly isLastPage = computed(() => !this.paginationData().links[this.paginationData().links.length - 1].url);

  getPagesList = computed(() => {
    return this.paginationData().links
      .filter(link => !isNaN(Number(link.label)))
      .map(link => (Number(link.label)));
  });

  goToPage(page: number): void {
    if (page >= 1 && page <= this.paginationData().last_page) {
      this.activePage.set(page);
    }
  }

  goToFirst(): void {
    this.goToPage(1);
  }

  goToLast(): void {
    this.goToPage(this.paginationData().last_page);
  }

  goToPrevious(): void {
    if (this.paginationData().prev_page_url) {
      this.activePage.set(this.paginationData().current_page - 1);
    }
  }

  goToNext(): void {
    if (this.paginationData().next_page_url) {
      this.activePage.set(this.paginationData().current_page + 1);
    }
  }

}
