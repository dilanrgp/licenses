import { Component, inject, input } from '@angular/core';
import { LoaderService } from '@services/loader.service';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
})
export class LoaderComponent { 

  loaderService = inject(LoaderService);


}
