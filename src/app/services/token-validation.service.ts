import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

import { Observable, throwError, map, catchError } from "rxjs";

import { License } from "@interfaces/license.interface";
import { LocaleService } from "./locale.service";


@Injectable({ providedIn: 'root' })
export class TokenValidationService {

    private _http = inject(HttpClient);
    private localeService = inject(LocaleService);
    private baseUrl = inject(LocaleService).getApiUrl;

    validate(token: string): Observable<License> {

        if (!token || typeof token !== 'string' || !/^[-\w]+\.[-\w]+\.[-\w]+$/.test(token)) {
            return throwError(() => new Error('Token inválido'));
        }

        return this._http.get<License>(`${this.baseUrl}/check-license/${token}`).pipe(
            map((response) => {
                return response;
            }),
            catchError((err) => {
                // Aquí puedes loggear o personalizar el error
                const errorMessage = this.localeService.translate('errors.validating_token');
                return throwError(() => new Error(`${errorMessage}: ${err.error.error}`));
            })
        );
    }
}
