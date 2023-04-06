import { Inject, Injectable } from '@angular/core';
import { AuthApplication } from '../../core/application/auth.application';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationGuard implements CanActivate, CanLoad {
  constructor(
    @Inject(AuthApplication) private auth: AuthApplication,
    private router: Router
  ) {}
  canActivate(): boolean {
    return this.validateAuthentication();
  }
  canLoad(): boolean {
    return this.validateAuthentication();
  }
  validateAuthentication(): boolean {
    const isUserLogged = this.auth.isAutenticated;
    if (!isUserLogged) {
      this.router.navigate(['/login']);
    }
    return isUserLogged;
  }
}
