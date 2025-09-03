import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JoditAngularModule } from 'jodit-angular';

@Component({
  selector: 'jodit-editor-component',
  imports: [FormsModule, JoditAngularModule],
  templateUrl: './jodit-editor-component.component.html',
  styleUrls: ['./jodit-editor-component.component.css'],
})
export class JoditEditorComponent {
  content = '';
}

