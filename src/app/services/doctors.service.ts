import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Doctor } from '../models/doctor.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  constructor(private http: HttpClient) {}

  getDoctors() {
    const url = `${base_url}/doctors`;
    return this.http
      .get<{ doctors: Doctor[] }>(url)
      .pipe(map((res) => res.doctors));
  }

  getDoctorById(id: string) {
    const url = `${base_url}/doctors/${id}`;
    return this.http
      .get<{ doctor: Doctor }>(url)
      .pipe(map((res) => res.doctor));
  }

  createDoctor(name: string, hospital: string) {
    const url = `${base_url}/doctors`;
    return this.http.post<{ doctor: Doctor }>(url, { name, hospital });
  }

  updateDoctor(id: string, name: string, hospital: string) {
    const url = `${base_url}/doctors/${id}`;
    return this.http.put<{ doctor: Doctor }>(url, { name, hospital });
  }

  deleteDoctor(id: string) {
    const url = `${base_url}/doctors/${id}`;
    return this.http.delete(url);
  }
}
