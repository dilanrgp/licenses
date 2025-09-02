import { Component, computed, inject } from '@angular/core';

import { ToastMessageService } from '@services/toast-message.service';

@Component({
  selector: 'app-toast-message',
  imports: [],
  templateUrl: './toast-message.component.html',
})
export class ToastMessageComponent {

  private _toastMessageService = inject(ToastMessageService);
  toasts = computed(() => this._toastMessageService.messages());

  getClass(type: string) {
    return (
      {
        success: 'alert-success',
        error: 'alert-error',
        info: 'alert-info',
        warning: 'alert-warning',
      }[type] ?? 'alert-info'
    );
  }
}
