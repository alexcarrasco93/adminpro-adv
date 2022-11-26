import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private storeToken = ({ token }) => {
    localStorage.setItem('token', token);
  };

  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    localStorage.removeItem('token');

    google.accounts.id.revoke('alexcarrascosalvador@gmail.com', () => {
      this.router.navigateByUrl('/login');
    })
  }

  validateToken() {
    const token = localStorage.getItem('token') || '';

    return this.http
      .get<{ token: string }>(`${base_url}/login/renew`, {
        headers: { 'x-token': token },
      })
      .pipe(
        tap(this.storeToken),
        map(() => true),
        catchError(() => of(false))
      );
  }

  createUser(formData: RegisterForm) {
    return this.http
      .post<{ token: string }>(`${base_url}/users`, formData)
      .pipe(tap(this.storeToken));
  }

  login(formData: LoginForm) {
    return this.http
      .post<{ token: string }>(`${base_url}/login`, formData)
      .pipe(tap(this.storeToken));
  }

  loginGoogle(token: string) {
    return this.http
      .post<{ token: string }>(`${base_url}/login/google`, { token })
      .pipe(tap(this.storeToken));
  }
}
