import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable()

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean | any {
    if(this.authService.isAuthenticated()){
      return true
    } else {
      this.authService.logout()
      this.router.navigate(['/admin', 'login'], {
        queryParams: {
          shouldLogin: true
        }
      })
    }
  }
}
