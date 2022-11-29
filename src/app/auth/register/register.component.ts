import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { RegisterForm } from '../../interfaces/register-form.interface';

function matchingPasswords(passName1: string, passName2: string) {
  return (formGroup: AbstractControl) => {
    const passControl1 = formGroup.get(passName1);
    const passControl2 = formGroup.get(passName2);

    return passControl1?.value !== passControl2?.value
      ? { matchingPasswords: true }
      : null;
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  formSubmitted = false;
  registerForm = this.fb.group(
    {
      name: ['Alex', Validators.required],
      email: ['alex@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required],
      password2: ['123456', Validators.required],
      terms: [false, Validators.required],
    },
    {
      validators: [matchingPasswords('password', 'password2')],
    }
  );

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  createUser() {
    this.formSubmitted = true;

    if (this.registerForm.invalid || !this.registerForm.get('terms')?.value) {
      return;
    }

    this.userService
      .createUser(this.registerForm.value as RegisterForm)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/');
        },
        error(err) {
          Swal.fire('Error', err.error.msg, 'error');
        },
      });
  }

  invalidField(fieldName: string) {
    return this.registerForm.get(fieldName)?.invalid && this.formSubmitted
      ? true
      : false;
  }

  acceptTerms() {
    return !this.registerForm.get('terms')?.value && this.formSubmitted
      ? true
      : false;
  }
}
