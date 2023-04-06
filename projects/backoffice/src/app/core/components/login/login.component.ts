import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import ValidatorsCustom from '../../../shared/helpers/validators';
import { AuthApplication } from '../../application/auth.application';
import { AuthEntity } from '../../domain/entities/auth.entity';

@Component({
  selector: 'amb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  constructor(
    private router: Router,
    private authApplication: AuthApplication
  ) {}

  ngOnInit(): void {
    this.loadForm();
  }

  login() {
    // this.router.navigate(['/dashboard']);
    // se envia una entidad
    const { email, password } = this.formGroup.value;
    const auth = new AuthEntity(email, password, 'abcd');
    this.authApplication.login(auth);
    // console.log(this.formGroup);
  }
  loadForm() {
    this.formGroup = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        // ValidatorsCustom.validateEmailCompany,
        ValidatorsCustom.validateEmailCompanyCustom(['@correo.com']),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
    });
  }
  validateForm() {
    // this.formGroup.markAllAsTouched();
    this.formGroup.get('password')?.markAllAsTouched();
    this.formGroup.updateValueAndValidity();
  }
  get email() {
    return this.formGroup.get('email');
  }
  get password() {
    return this.formGroup.get('password');
  }
  // validateEmailCompany(control: FormControl) {
  //   if (!control.value) return null;
  //   if (control.value.trim().toLowerCase().indexOf(`@correo.com`) != -1) {
  //     return null;
  //   }
  //   return { emailNotAllowed: true };
  // }
}
