import { Component, input, signal } from '@angular/core';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import CustomEditor from '@shared/editors/ckeditor-custom';

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
