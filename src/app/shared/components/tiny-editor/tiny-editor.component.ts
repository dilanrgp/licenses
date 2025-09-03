import { Component } from '@angular/core';
import { EditorModule } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-tiny-editor',
  imports: [EditorModule],
  templateUrl: './tiny-editor.component.html',
  styleUrls: ['./tiny-editor.component.css'],
})
export class TinyEditorComponent {
  apiKey = 'no-api-key';

  editorConfig = {
    menubar: false,
    plugins: 'link lists',
    toolbar:
      'undo redo | bold italic underline | bullist numlist | link',
  };
}

