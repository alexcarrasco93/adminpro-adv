import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor() {}

  async updateImage(
    file: File,
    type: 'users' | 'doctors' | 'hospitals',
    id: string
  ) {
    try {
      const url = `${base_url}/upload/${type}/${id}`;
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(url, {
        method: 'PUT',
        body: formData,
        headers: { 'x-token': localStorage.getItem('token') || '' },
      });

      const data = await res.json();

      return data.ok ? data.fileName : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
