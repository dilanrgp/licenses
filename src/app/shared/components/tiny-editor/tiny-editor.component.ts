import { Component, computed, forwardRef, input, output, signal } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

type TinyConfig = Record<string, unknown>;
@Component({
  selector: 'app-tiny-editor',
  imports: [EditorModule, FormsModule],
  templateUrl: './tiny-editor.component.html',
  styleUrls: ['./tiny-editor.component.css'],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TinyEditorComponent),
      multi: true,
    },
  ]
})
export class TinyEditorComponent {

  config = input<TinyConfig>({
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image table code',
    toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | indent outdent | bullist numlist',
    license_key: 'gpl',
  });

  textChanged = output<string>();
  blurred = output<void>();

  _value = signal<string>('');
  isDisabled = signal<boolean>(false);

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  initConfig = computed(() => this.config());

  
  apiKey = 'GPL';

  writeValue(value: string | null): void {
    this._value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.isDisabled.set(disabled);
  }


  setValue(value: string) {
    if (value !== this._value()) {
      this._value.set(value);
      this.onChange(value);
      this.textChanged.emit(value);
    }
  }

  handleBlur() {
    this.onTouched();
    this.blurred.emit();
  }
}

