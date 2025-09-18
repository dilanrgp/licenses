import { Pipe, type PipeTransform } from '@angular/core';
import { LocaleService } from '@services/locale.service';

@Pipe({
  name: 'changeLanguage',
})
export class ChangeLanguagePipe implements PipeTransform {
  constructor(private localeService: LocaleService) {}

  transform(key: string, params?: Record<string, any>): string {

    if (key) {
      const prefix = "translate:";
      key = key.startsWith(prefix) ? key.slice(prefix.length) : key;
    }

    return (key) ? this.localeService.translate(key, params) : '';
  }
}
