import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  open(id: string): void {
    const modal = document.getElementById(id) as HTMLDialogElement;
    const overlay = document.getElementById('modal-overlay') as HTMLDivElement;
    modal?.show();
    overlay.classList.remove('overlay-hidden');
  }

  close(id: string): void {
    const modal = document.getElementById(id) as HTMLDialogElement;
    const overlay = document.getElementById('modal-overlay') as HTMLDivElement;
    modal?.close();
    overlay.classList.add('overlay-hidden');
  }

}
