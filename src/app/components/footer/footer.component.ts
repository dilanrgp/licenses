import { Component } from '@angular/core';
import { ChangeLanguagePipe } from '@pipes/change-language.pipe';

@Component({
  selector: 'app-footer',
  imports: [ChangeLanguagePipe],
  templateUrl: './footer.component.html',
})
export class FooterComponent { }
