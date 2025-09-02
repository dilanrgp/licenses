import { Component, input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  imports: [],
  templateUrl: './skeleton.component.html',
})
export class SkeletonComponent {

  pageName = input<string>('');

 }
