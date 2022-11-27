import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class User {
  constructor(
    public name: string,
    public email: string,
    public role: string,
    public img?: string,
    public password?: string,
    public google?: boolean,
    public uid?: string
  ) {}

  get imageUrl() {
    if (this.img?.includes('http')) {
      return this.img;
    }
    return this.img
      ? `${base_url}/upload/users/${this.img}`
      : `${base_url}/upload/users/no-image`;
  }

  get isGoogleImage() {
    return this.img?.includes('http') ? true : false;
  }
}
