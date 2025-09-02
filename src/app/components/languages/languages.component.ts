import { Component, inject, signal, computed } from '@angular/core';
import { AvailableLocale, LocaleService } from '@services/locale.service';

@Component({
  selector: 'app-languages',
  imports: [],
  templateUrl: './languages.component.html',
})
export class LanguagesComponent {
  localService = inject(LocaleService);

  userLang = signal(navigator.language);
  applicationLanguage = computed( () => this.localService.getLocale);
  
  changeLocale(locale: AvailableLocale) {
    this.localService.changeLocale(locale);
  }
}
