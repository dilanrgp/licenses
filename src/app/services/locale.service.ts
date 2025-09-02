import { ActivatedRoute } from '@angular/router';
import { inject, Injectable, signal } from '@angular/core';

import { environment } from '../../environments/environment.development';
import { TRANSLATIONS } from '@utils/translations';

export type AvailableLocale = 'es' | 'en';

@Injectable({
  providedIn: 'root',
})
export class LocaleService {

  private currentLocal = signal<AvailableLocale>('en');
  route = inject(ActivatedRoute);

  constructor() {
    const browserLang = navigator.language;
    const normalizedLang: AvailableLocale = browserLang.startsWith('es')
      ? 'es'
      : 'en';

    // Si ya hay un idioma en localStorage, se usa ese
    const storedLang = localStorage.getItem('locale') as AvailableLocale;

    // Establecer el idioma: primero localStorage, luego navegador
    this.currentLocal.set(storedLang ?? normalizedLang);

    // Guardar en localStorage si no estaba ya
    if (!storedLang) {
      localStorage.setItem('locale', normalizedLang);
    }
  }

  getCurrentTitle(routePath: string): string {
    return this.translate(`navbar.${routePath}`);
  }

  get getLocale() {
    return this.currentLocal();
  }

  get getApiUrl() {
    return `${environment.apiUrl}`;
  }

  changeLocale(locale: AvailableLocale) {
    localStorage.setItem('locale', locale);
    this.currentLocal.set(locale);
    window.location.reload();
  }
  

  translate(keyPath: string, params: Record<string, any> = {}): string {
    const keys = keyPath.split('.');
    let translation: any = TRANSLATIONS[this.currentLocal()];

    for (const key of keys) {
      if (translation?.[key] !== undefined) {
        translation = translation[key];
      } else {
        return keyPath; // Fallback if key not found
      }
    }

    return this.interpolate(translation, params);

  }

  private interpolate(template: string, params: Record<string, any>): string {
    if (typeof template !== 'string') return template;

    return template.replace(/\$\{(.+?)\}/g, (_, match) => {
      try {
        return Function('params', `with(params) { return ${match} }`)(params);
      } catch {
        return '';
      }
    });
  }
}
