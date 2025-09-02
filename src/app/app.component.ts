import { Component, ChangeDetectionStrategy, inject, signal, LOCALE_ID } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { FooterComponent } from "@components/footer/footer.component";
import { LanguagesComponent } from "@components/languages/languages.component";
import { LoaderComponent } from "@components/loader/loader.component";
import { LocaleService } from "@services/locale.service";
import { NavbarComponent } from "@components/navbar/navbar.component";
import { ToastMessageComponent } from "@components/toast-message/toast-message.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [NavbarComponent, FooterComponent, RouterOutlet, ToastMessageComponent, LoaderComponent, LanguagesComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  title = 'licensing-portal-front';

  localService = inject(LocaleService);
  currentLocale = signal(inject(LOCALE_ID));

}
