import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private _loading = signal(false);

  get loading() {
    return this._loading.asReadonly();
  }

  show() {
    this._loading.set(true);
  }

  hide() {
    this._loading.set(false);
  }

  toggle() {
    this._loading.update(value => !value);
  }

}
