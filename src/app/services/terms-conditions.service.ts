import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Options } from '@interfaces/api-response.interface';
import { Observable, of, tap, map, catchError, throwError } from 'rxjs';
import { LocaleService } from './locale.service';
import { ToastMessageService } from './toast-message.service';
import { ApiOneTermResponse, ApiTermsResponse, TermsAndConditions } from '@interfaces/terms-conditions.interface';

@Injectable({
  providedIn: 'root',
})
export class TermsConditionsService {
  
  private http = inject(HttpClient);
  private messageService = inject(ToastMessageService);
  private baseUrl = inject(LocaleService).getApiUrl;

  private termsCache = new Map<string, ApiTermsResponse>();
  private termCache = new Map<number, TermsAndConditions>();

  getTermsAndConditions(options: Options): Observable<ApiTermsResponse> {
    const { page = '' } = options;

    const key = `${page}`;

    if (this.termsCache.has(key)) {
      return of(this.termsCache.get(key)!);
    }

    return this.http
      .get<ApiTermsResponse>(`${this.baseUrl}/terms-conditions`)
      .pipe(
        tap((response) => this.termsCache.set(key, response)),
        map((response) => {
          return response;
        }),
        catchError((error) => {
          this.messageService.toast({
            originalMessage: 'errors.obtaining_terms',
            type: 'error',
            translate: true,
          });
          return throwError(() => error);
        })
      );
  }


  updateTermsAndConditions(termId: number, termsAndConditions: TermsAndConditions): Observable<ApiOneTermResponse>{
    return this.http.patch<ApiOneTermResponse>(`${this.baseUrl}/terms-conditions/${termId}`, termsAndConditions)
    .pipe(
      tap((term) => {
        this.updateTermsCache(term.data)})
    );
    
  }


  createTermsAndConditions(termsAndConditions: TermsAndConditions): Observable<ApiOneTermResponse>{
    return this.http.post<ApiOneTermResponse>(`${this.baseUrl}/terms-conditions`, termsAndConditions).pipe(
      tap((term) => {
        this.updateTermsCache(term.data)})
    );
    
  }

  updateTermsCache(termsAndConditions: TermsAndConditions) {

    const termsId = termsAndConditions.id;

    this.termCache.set(termsId, termsAndConditions);

    this.termsCache.forEach((cachedTerms) => {
      cachedTerms.data = cachedTerms.data.map((currentTerm) =>
        currentTerm.id === termsId ? termsAndConditions : currentTerm
      );
    });


  }
}
