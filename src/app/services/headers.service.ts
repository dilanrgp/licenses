import { HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LocaleService } from './locale.service';

@Injectable({
  providedIn: 'root',
})
export class HeadersService {

  private localeService = inject(LocaleService);

  authHeaders(token: string): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'X-Accept-Language': `${this.localeService.getLocale}`,
      }),
    };
  }

  
}
