import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient) {}

  updateImage(file: File, type: 'users' | 'doctors' | 'hospitals', id: string) {
    const formData = new FormData();
    formData.append('image', file);
    return this.http
      .put<{ fileName: string }>(`${base_url}/upload/${type}/${id}`, formData, {
        reportProgress: true,
        responseType: 'json',
      })
      .pipe(
        tap(console.log),
        map(({ fileName }) => fileName)
      );
  }
}
