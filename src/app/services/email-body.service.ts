import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Options } from '@interfaces/api-response.interface';
import {
  ApiEmailBodiesResponse,
  ApiOneEmailBodyResponse,
  EmailBody,
} from '@interfaces/email-body.interface';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { HeadersService } from './headers.service';
import { ToastMessageService } from './toast-message.service';
import { LocaleService } from './locale.service';

@Injectable({
  providedIn: 'root',
})
export class EmailBodyService {
  private http = inject(HttpClient);
  private messageService = inject(ToastMessageService);
  private localeService = inject(LocaleService);
  private baseUrl = this.localeService.getApiUrl;
  private headersService = inject(HeadersService);

  private emailBodiesCache = new Map<string, ApiEmailBodiesResponse>();
  private emailBodyCache = new Map<number, EmailBody>();

  getEmailBodies(options: Options): Observable<ApiEmailBodiesResponse> {
    const { page = '' } = options;
    const token = ''; // TODO: ESTO DEBE SUSTITUIRSE POR EL TOKEN QUE PROPORCIONARA EL BACKEND

    const key = `${page}`;

    if (this.emailBodiesCache.has(key)) {
      return of(this.emailBodiesCache.get(key)!);
    }

    return this.http
      .get<ApiEmailBodiesResponse>(`${this.baseUrl}/paginated-types`, {
        ...this.headersService.authHeaders(token),
        params: { page },
      })
      .pipe(
        tap((response) => this.emailBodiesCache.set(key, response)),
        map((response) => {
          return response;
        }),
        catchError((error) => {
          this.messageService.toast({
            originalMessage: 'errors.obtaining_email_bodies',
            type: 'error',
            translate: true,
          });
          return throwError(() => error);
        })
      );
  }

  updateEmailBody(emailBodyId: number, EmailBody: EmailBody ): Observable<ApiOneEmailBodyResponse> {
    return this.http.patch<ApiOneEmailBodyResponse>(`${this.baseUrl}/types/${emailBodyId}`, EmailBody )
      .pipe(
        tap((term) => {
          this.updateTermsCache(term.data);
        })
      );
  }

  updateTermsCache(emailBody: EmailBody) {
    const emailBodyId = emailBody.id;

    this.emailBodyCache.set(emailBodyId, emailBody);

    this.emailBodiesCache.forEach((cachedEmailBody) => {
      cachedEmailBody.data = cachedEmailBody.data.map((currentEmailBody) =>
        currentEmailBody.id === emailBodyId ? emailBody : currentEmailBody
      );
    });
  }
}
