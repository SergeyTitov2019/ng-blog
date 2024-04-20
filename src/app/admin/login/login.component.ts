import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from "@angular/forms";
import { User } from "../../shared/interfaces/user";
import { AuthService } from "../../shared/services/auth.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  form!: FormGroup
  submitted: boolean = false
  massage: string = ''

  constructor( public authService: AuthService,
               private router: Router,
               private route: ActivatedRoute
               ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if(params['shouldLogin']){
        this.massage = 'Pls, enter credentials again'
      } else if(params['authFailed']){
        this.massage = 'Session is over. Pls, enter credentials again'
      }
    })
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.minLength(6),
        Validators.required
      ]),
    })
  }

  onSubmit() {
    if(this.form.invalid){
      return
    }
    this.submitted = true
    console.log(this.form.value);
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    }
    this.authService.login(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/admin', 'dashboard'])
      this.submitted = false
    }, () => {
      this.submitted = false
    })


  }
}
