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
import { ApiTypeResponse, Type } from '@interfaces/type.interface';
import { ApiKeywordsResponse, Keyword } from '@interfaces/keywords.interface';

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

  getLicenseTemplates(options: Options): Observable<ApiLicenseTemplateResponse> {
    const { page = '' } = options;
    const token = ''; // TODO: ESTO DEBE SUSTITUIRSE POR EL TOKEN QUE PROPORCIONARA EL BACKEND

    const key = `${page}`;

    if (this.licenseTemplatesCache.has(key)) {
      return of(this.licenseTemplatesCache.get(key)!);
    }

    return this.http.get<ApiLicenseTemplateResponse>(`${this.baseUrl}/license-templates`, {
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

  getTypes(): Observable<Type[]> {
    const token = '';

    return this.http
      .get<ApiTypeResponse>(`${this.baseUrl}/types`, {
        ...this.headersService.authHeaders(token),
      })
      .pipe(
        map((response) => {
          return response.data;
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


  getKeywords(): Observable<Keyword[]> {
    const token = '';

    return this.http.get<ApiKeywordsResponse>(`${this.baseUrl}/keywords`, {
        ...this.headersService.authHeaders(token),
      }).pipe(
        map((response) => {
          return response.data;
        }),
        catchError((error) => {
          this.messageService.toast({
            originalMessage: 'errors.obtaining_keywords',
            type: 'error',
            translate: true,
          });
          return throwError(() => error);
        })
      );
  }

  createTemplate(licenseTemplate: LicenseTemplate, logoFile?: File | null): Observable<ApiOneLicenseTemplateResponse>{
     const formDataTemplate = this.toFormData(licenseTemplate, logoFile);

      return this.http.post<ApiOneLicenseTemplateResponse>(`${this.baseUrl}/license-templates`, formDataTemplate).pipe(
        tap((template) => {
          this.updateLicenseTemplateCache(template.data)}), catchError((error) => {
          this.messageService.toast({
            originalMessage: 'errors.obtaining_types',
            type: 'error',
            translate: true,
          });
          return throwError(() => error);
        })
      );
      
    }

  updateTemplate(templateId: number, licenseTemplate: LicenseTemplate, logoFile?: File | null): Observable<ApiOneLicenseTemplateResponse> {
    const formDataTemplate = this.toFormData(licenseTemplate, logoFile);

    formDataTemplate.append('_method', 'PATCH');
    
    return this.http.post<ApiOneLicenseTemplateResponse>(`${this.baseUrl}/license-templates/${templateId}`, formDataTemplate)
      .pipe(
        tap((licenseTemplate) => {
          this.updateLicenseTemplateCache(licenseTemplate.data);
        }),
        catchError((resp) => {
          this.messageService.toast({
            originalMessage: resp.error.errors,
            type: 'error',
            translate: true,
          });
          return throwError(() => resp.error);
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

  private toFormData(template: LicenseTemplate, logoFile?: File | null): FormData {
    const fd = new FormData();

    fd.append('title', template.title);
    fd.append('type_id', String(template.type_id));
    fd.append('content', template.content ?? '');

    if (template.active !== undefined && template.active !== null) {
      fd.append('active', String(template.active));
    }

    if (template.logo_path !== null) {
      fd.append('logo_path', template.logo_path!);
    }
    if (logoFile instanceof File) {
      fd.append('logo', logoFile);
    }

    return fd;
  }

  getUrlLogoTemplate(fileName: string): string | null {

    return (fileName) ? `${this.baseUrl}/license-template-logos/${fileName}` : null;

  }
}
