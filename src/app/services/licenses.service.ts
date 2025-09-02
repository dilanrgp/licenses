import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

import { Observable, of, tap, map, catchError, throwError } from "rxjs";

import { ApiError, ApiSimpleResponse, Options } from "@interfaces/api-response.interface";
import { environment } from "src/environments/environment.development";
import { LocaleService } from "./locale.service";
import { ToastMessageService } from "./toast-message.service";
import { ApiLicenseResponse, License } from "@interfaces/license.interface";
import { HeadersService } from "./headers.service";


const loadFromToLocalStorage = () => {
  const tokenFromLocalStorage =
    localStorage.getItem(environment.storageTokenKey) ?? '';
  const tokenClient = tokenFromLocalStorage;

  return tokenClient;
};


@Injectable({
  providedIn: 'root',
})
export class LicenseService {
  private http = inject(HttpClient);
  private messageService = inject(ToastMessageService);
  private localeService = inject(LocaleService);
  private baseUrl = this.localeService.getApiUrl;
  private headersService = inject(HeadersService);

  private licensesCache = new Map<string, ApiLicenseResponse>();

  getLicenses(options: Options): Observable<ApiLicenseResponse> {
    const { page = '' } = options;
    const token = ''; // TODO: ESTO DEBE SUSTITUIRSE POR EL TOKEN QUE PROPORCIONARA EL BACKEND

    const key = `${page}`;

    if (this.licensesCache.has(key)) {
      return of(this.licensesCache.get(key)!);
    }

    return this.http.get<ApiLicenseResponse>(`${this.baseUrl}/licenses`, {
      ...this.headersService.authHeaders(token),
      params: { page },
      }).pipe(
        tap((response) => this.licensesCache.set(key, response)),
        map((response) => {
          return response;
        }),
        catchError((error) => {
          this.messageService.toast({ originalMessage: 'errors.obtaining_license', type: 'error', translate: true});
          return throwError(() => error);
        })
      );
  }

  sendMailByLicense(license: License): Observable<ApiSimpleResponse>{

    if (license.license_status_id > 2) {
      this.messageService.toast({ originalMessage: 'errors.sending_mail', type: 'error', translate: true});
      return throwError(() => this.localeService.translate('errors.sending_mail'));
    }

    const token = ''; // TODO: ESTO DEBE SUSTITUIRSE POR EL TOKEN QUE PROPORCIONARA EL BACKEND

    return this.http.get<ApiSimpleResponse>(`${this.baseUrl}/send-tokens-license/${license.id}`, this.headersService.authHeaders(token)).pipe(
      map((response) => {
        return response;
      }),
      catchError((errorResponse: ApiSimpleResponse) => {
          this.messageService.toast({ originalMessage: errorResponse.error?.error.message!, type: 'error'});
          return throwError(() => errorResponse);
        })
      );

  }
}
