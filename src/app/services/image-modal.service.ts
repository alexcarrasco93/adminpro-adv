import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ImageModalService {
  private _hideModal = true;
  type?: 'users' | 'doctors' | 'hospitals';
  user?: User;
  newImage = new EventEmitter<string>();

  get hideModal() {
    return this._hideModal;
  }

  constructor() {}

  openModal(type: 'users' | 'doctors' | 'hospitals', user: User) {
    this._hideModal = false;
    this.type = type;
    this.user = user;
    console.log(this.user);
  }

  closeModal() {
    this._hideModal = true;
  }
}
