import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { tap } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private userService: UserService, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]) {
    return this.userService
      .validateToken()
      .pipe(tap((isAuth) => !isAuth && this.router.navigateByUrl('/login')));
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userService
      .validateToken()
      .pipe(tap((isAuth) => !isAuth && this.router.navigateByUrl('/login')));
  }
}
