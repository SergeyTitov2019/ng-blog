import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validator, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  form!: FormGroup

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.minLength(5),
        Validators.required
      ]),
    })
  }

  onSubmit() {
    // if(this.form.invalid){
    //   return
    // }
    console.log(this.form.value);
    // this.form.value
  }
}
