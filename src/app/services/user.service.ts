import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { User } from '../models/user.model';

declare const google: any;

const base_url = environment.base_url;

interface StoreTokenAndMenu {
  token: string;
  menu: any;
  user?: User;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user!: User;

  private storeToken = ({ token, menu }: StoreTokenAndMenu) => {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id:
        '949503290627-uqo9ljd7bpkvkgq57r2r6ntpgaqk7q9i.apps.googleusercontent.com',
      callback: (res: any) => this.handleCredentialResponse(res),
    });
  }

  private handleCredentialResponse(res: any) {
    this.loginGoogle(res.credential).subscribe({
      next: () => {
        this.ngZone.run(() => this.router.navigateByUrl('/'));
      },
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    if (this.user.google) {
      google.accounts.id.revoke(this.user.email, () => {
        this.router.navigateByUrl('/login');
      });
      return;
    }
    this.router.navigateByUrl('/login');
  }

  validateToken() {
    const token = localStorage.getItem('token') || '';

    return this.http
      .get<{ token: string; menu: any; user: User }>(`${base_url}/login/renew`)
      .pipe(
        tap(this.storeToken),
        tap(({ user }) => {
          const { name, email, role, img, google, uid } = user as User;
          this.user = new User(name, email, role, img, '', google, uid);
        }),
        map(() => true),
        catchError(() => of(false))
      );
  }

  createUser(formData: RegisterForm) {
    return this.http
      .post<{ token: string; menu: any }>(`${base_url}/users`, formData)
      .pipe(tap(this.storeToken));
  }

  updateProfile(data: { email: string; name: string; role: string }) {
    return this.http.put<{ user: User }>(`${base_url}/users/${this.user.uid}`, {
      ...data,
      role: this.user.role,
    });
  }

  login(formData: LoginForm) {
    return this.http
      .post<{ token: string; menu: any }>(`${base_url}/login`, formData)
      .pipe(tap(this.storeToken));
  }

  loginGoogle(token: string) {
    return this.http
      .post<{ token: string; menu: any }>(`${base_url}/login/google`, { token })
      .pipe(tap(this.storeToken));
  }

  getUsers(from = 0) {
    const url = `${base_url}/users?from=${from}`;
    return this.http.get<{ users: User[]; total: number }>(url).pipe(
      map((res) => {
        const users = res.users.map(
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
        return {
          users,
          total: res.total,
        };
      })
    );
  }

  deleteUser(uid: string) {
    const url = `${base_url}/users/${uid}`;
    return this.http.delete(url);
  }

  updateUser(user: User) {
    return this.http.put<{ user: User }>(`${base_url}/users/${user.uid}`, user);
  }
}
