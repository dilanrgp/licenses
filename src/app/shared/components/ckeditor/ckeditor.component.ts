import { Component, input, signal } from '@angular/core';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-ckeditor',
  imports: [CKEditorModule],
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.css'],
})
export class CkeditorComponent {

  Editor: any = ClassicEditor;

  config = {
    placeholder: 'Escribe aquí tu contenido...',
    toolbar: {
      items: [
          'undo', 'redo',
          '|', 'bold', 'italic', 'alignment',
          '|', 'insertTable'
      ]
    },
    language: 'es',
    licenseKey: 'GLP'
  };



 }
