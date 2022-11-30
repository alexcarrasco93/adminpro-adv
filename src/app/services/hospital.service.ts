import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  constructor(private http: HttpClient) {}

  getHospitals() {
    const url = `${base_url}/hospitals`;
    return this.http
      .get<{ hospitals: Hospital[] }>(url)
      .pipe(map((res) => res.hospitals));
  }

  createHospital(name: string) {
    const url = `${base_url}/hospitals`;
    return this.http.post<{ hospital: Hospital }>(url, { name });
  }

  updateHospital(id: string, name: string) {
    const url = `${base_url}/hospitals/${id}`;
    return this.http.put<{ hospital: Hospital }>(url, { name });
  }

  deleteHospital(id: string) {
    const url = `${base_url}/hospitals/${id}`;
    return this.http.delete(url);
  }
}
