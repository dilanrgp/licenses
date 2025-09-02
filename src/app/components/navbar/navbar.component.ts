import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { routes } from '../../app.routes';
import { MenuItem } from '../../interfaces/navbar';
import { LocaleService } from '../../services/locale.service';

const reactiveItems = routes ?? [];

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent { 

  localeService = inject(LocaleService);

   reactiveMenu: MenuItem[] = reactiveItems
    .filter((item) => item.path !== '**')
    .map(item => {
      return ({
        route: `${item.path}`,
        title: this.localeService.translate(`navbar.${item.path!}`),
    });
});


}
