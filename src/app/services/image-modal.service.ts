import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ImageModalService {
  private _hideModal = true;
  type!: 'users' | 'doctors' | 'hospitals';
  id?: string;
  img?: string;
  isGoogleImage = false;
  newImage = new EventEmitter<string>();

  get hideModal() {
    return this._hideModal;
  }

  constructor() {}

  openModal(
    type: 'users' | 'doctors' | 'hospitals',
    id: string,
    img: string,
    isGoogleImage = false
  ) {
    this._hideModal = false;
    this.type = type;
    this.id = id;
    this.isGoogleImage = isGoogleImage;

    if (img?.includes('https')) {
      this.img = img;
    } else {
      if (img) {
        this.img = `${base_url}/upload/${type}/${img}`;
      } else {
        this.img = `${base_url}/upload/${type}/no-image`;
      }
    }
  }

  closeModal() {
    this._hideModal = true;
  }
}
