import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/services/auth/token.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalInformationGuard implements CanActivate {
  realRole: string = '';

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    this.realRole = this.tokenService.isAdmin() ? 'admin' : 'user';
    if (!this.tokenService.isLogged() || expectedRole.indexOf(this.realRole) < 0) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
  
}
