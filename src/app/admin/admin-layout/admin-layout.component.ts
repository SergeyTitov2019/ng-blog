import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  constructor(private router: Router,
              public authService: AuthService,
              ) {}

  logout(event: Event) {
    event.preventDefault()
    this.router.navigate(['/admin', 'login'])
    this.authService.logout()
  }
}
