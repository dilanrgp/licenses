import { Pipe, type PipeTransform } from '@angular/core';
import { LocaleService } from '@services/locale.service';

@Pipe({
  name: 'changeLanguage',
})
export class ChangeLanguagePipe implements PipeTransform {
  constructor(private localeService: LocaleService) {}

  transform(key: string, params?: Record<string, any>): string {
    return this.localeService.translate(key, params);
  }
}
