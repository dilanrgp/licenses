import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, of, tap, map, catchError, throwError } from 'rxjs';

import {
  ApiError,
  ApiSimpleResponse,
  Options,
} from '@interfaces/api-response.interface';
import { environment } from 'src/environments/environment.development';
import { LocaleService } from './locale.service';
import { ToastMessageService } from './toast-message.service';
import { ApiLicenseResponse, License } from '@interfaces/license.interface';
import { HeadersService } from './headers.service';
import {
  ApiLicenseTemplateResponse,
  ApiOneLicenseTemplateResponse,
  LicenseTemplate,
} from '@interfaces/license-template.interface';
import { ApiTypeResponse } from '@interfaces/type.interface';

const loadFromToLocalStorage = () => {
  const tokenFromLocalStorage =
    localStorage.getItem(environment.storageTokenKey) ?? '';
  const tokenClient = tokenFromLocalStorage;

  return tokenClient;
};

@Injectable({
  providedIn: 'root',
})
export class LicenseTemplateService {
  private http = inject(HttpClient);
  private messageService = inject(ToastMessageService);
  private baseUrl = inject(LocaleService).getApiUrl;
  private headersService = inject(HeadersService);

  private licenseTemplatesCache = new Map<string, ApiLicenseTemplateResponse>();
  private licenseTemplateCache = new Map<number, LicenseTemplate>();

  getLicenseTemplates(
    options: Options
  ): Observable<ApiLicenseTemplateResponse> {
    const { page = '' } = options;
    const token = ''; // TODO: ESTO DEBE SUSTITUIRSE POR EL TOKEN QUE PROPORCIONARA EL BACKEND

    const key = `${page}`;

    if (this.licenseTemplatesCache.has(key)) {
      return of(this.licenseTemplatesCache.get(key)!);
    }

    return this.http
      .get<ApiLicenseTemplateResponse>(`${this.baseUrl}/license-templates`, {
        ...this.headersService.authHeaders(token),
        params: { page },
      })
      .pipe(
        tap((response) => this.licenseTemplatesCache.set(key, response)),
        map((response) => {
          return response;
        }),
        catchError((error) => {
          this.messageService.toast({
            originalMessage: 'errors.obtaining_license_template',
            type: 'error',
            translate: true,
          });
          return throwError(() => error);
        })
      );
  }

  getTypes(): Observable<ApiTypeResponse> {
    const token = '';

    return this.http
      .get<ApiTypeResponse>(`${this.baseUrl}/types`, {
        ...this.headersService.authHeaders(token),
      })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          this.messageService.toast({
            originalMessage: 'errors.obtaining_types',
            type: 'error',
            translate: true,
          });
          return throwError(() => error);
        })
      );
  }

  createTermsAndConditions(licenseTemplate: LicenseTemplate): Observable<ApiOneLicenseTemplateResponse>{
      return this.http.post<ApiOneLicenseTemplateResponse>(`${this.baseUrl}/license-templates`, licenseTemplate).pipe(
        tap((template) => {
          this.updateLicenseTemplateCache(template.data)})
      );
      
    }

  updateTermsAndConditions(templateId: number, licenseTemplate: LicenseTemplate): Observable<ApiOneLicenseTemplateResponse> {
    return this.http.patch<ApiOneLicenseTemplateResponse>(`${this.baseUrl}/license-templates/${templateId}`, licenseTemplate)
      .pipe(
        tap((licenseTemplate) => {
          this.updateLicenseTemplateCache(licenseTemplate.data);
        })
      );
  }

  updateLicenseTemplateCache(licenseTemplate: LicenseTemplate) {
    const templateId = licenseTemplate.id;

    this.licenseTemplateCache.set(templateId, licenseTemplate);

    this.licenseTemplatesCache.forEach((cachedTemplate) => {
      cachedTemplate.data = cachedTemplate.data.map((currentTerm) =>
        currentTerm.id === templateId ? licenseTemplate : currentTerm
      );
    });
  }
}
