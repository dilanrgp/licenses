import { inject, Injectable, signal } from '@angular/core';

import { ToastMessage, ToastType } from '@interfaces/toast-message.interface';
import { LocaleService } from './locale.service';

interface ToastOptions {
  originalMessage: string;
  type?: ToastType;
  duration?: number;
  translate?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ToastMessageService {
  
  localeService = inject(LocaleService);
  private toasts = signal<ToastMessage[]>([]);

  /**
   * Muestra un mensaje toast
   * @param message Mensaje a mostrar
   * @param type Tipo de mensaje: 'success', 'error', 'info', 'warning'
   * @param duration Duración en milisegundos (por defecto: 5000)
   */
  toast(options: ToastOptions) {

    const { originalMessage, type = 'info', duration = 5000, translate = false } = options;

    const message = (translate) ? this.localeService.translate(`${originalMessage}`) : originalMessage;
    
    const toast: ToastMessage = { message, type, duration };
    this.toasts.update((prev) => [...prev, toast]);

    setTimeout(() => {
      this.toasts.update((prev) => prev.filter((t) => t !== toast));
    }, duration);
  }

  get messages() {
    return this.toasts.asReadonly();
  }
}
