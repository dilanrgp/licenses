import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';

import localEs from '@angular/common/locales/es';
import localEn from '@angular/common/locales/en';
import { LocaleService } from './services/locale.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideQuillConfig } from 'ngx-quill';

registerLocaleData(localEs,'es');
registerLocaleData(localEn,'en');


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: LOCALE_ID,
      deps: [LocaleService],
      useFactory: (localService: LocaleService) => localService.getLocale,
    },
    provideHttpClient(withFetch()),
    provideQuillConfig({ modules: { toolbar: [['bold', 'italic']] } })
  ],
};
