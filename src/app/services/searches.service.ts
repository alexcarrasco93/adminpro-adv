import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Doctor } from '../models/doctor.model';
import { Hospital } from '../models/hospital.model';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class SearchesService {
  constructor(private http: HttpClient) {}

  search(type: 'users' | 'doctors' | 'hospitals', term: string) {
    const url = `${base_url}/all/collection/${type}/${term}`;
    return this.http.get<{ results: any[] }>(url).pipe(
      map(({ results }) => {
        switch (type) {
          case 'users':
            return this.tranformUsers(results);
          case 'hospitals':
            return results as Hospital[];
          case 'doctors':
            return results as Doctor[];
          default:
            return [];
        }
      })
    );
  }

  private tranformUsers(results: any[]) {
    return results.map(
      (user) =>
        new User(
          user.name,
          user.email,
          user.role,
          user.img,
          user.password,
          user.google,
          user.uid
        )
    );
  }
}
