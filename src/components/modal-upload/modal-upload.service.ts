import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {
  public type: string;
  public id: string;
  public hide = 'hide';
  public notification = new EventEmitter<any>();

  constructor() {
    console.log('Modal upload listo!');
  }

  /**
   * Hide modal of the interface
   */
  hideModal(): void {
    this.hide = 'hide';
    this.type = null;
    this.id = null;
  }

  /**
   * Show modal in interface
   * @param type Type of image to upload `users, hospitals, medicos `
   * @param id User's id
   */
  showModal(type: string, id: string): void {
    this.hide = '';
    this.id = id;
    this.type = type;
  }
}
