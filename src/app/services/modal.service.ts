import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  open(id: string): void {
    const modal = document.getElementById(id) as HTMLDivElement;
    const overlay = document.getElementById('modal-overlay') as HTMLDivElement;

    if (modal) {
      modal.classList.add('modal-open');
      overlay.classList.remove('overlay-hidden');
    }
  }

  close(id: string): void {
    const modal = document.getElementById(id) as HTMLDivElement;
    const overlay = document.getElementById('modal-overlay') as HTMLDivElement;

    modal?.classList.remove('modal-open');
    overlay.classList.add('overlay-hidden');
  }

}
