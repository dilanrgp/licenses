import { Component, input, signal } from '@angular/core';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import CustomEditor from '@shared/editors/ckeditor-custom';
// import '@ckeditor/ckeditor5-theme-lark/theme/index.css';
// import '@ckeditor/ckeditor5-build-classic/build/ckeditor.css';

@Component({
  selector: 'app-ckeditor',
  imports: [CKEditorModule],
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.css'],
})
export class CkeditorComponent {
  //   // Editor: any = ClassicEditor;
  Editor: any = CustomEditor;

}
