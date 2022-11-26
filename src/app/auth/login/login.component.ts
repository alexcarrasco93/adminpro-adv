import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { LoginForm } from '../../interfaces/login-form.interface';
import { UserService } from '../../services/user.service';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('googleBtn')
  googleBtn!: ElementRef;

  formSubmitted = false;
  loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', Validators.required],
    remember: [false],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngAfterViewInit() {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id:
        '949503290627-uqo9ljd7bpkvkgq57r2r6ntpgaqk7q9i.apps.googleusercontent.com',
      callback: (res: any) => this.handleCredentialResponse(res),
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: 'outline', size: 'large' } // customization attributes
    );
  }

  handleCredentialResponse(res: any) {
    this.userService.loginGoogle(res.credential).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
    });
  }

  login() {
    this.userService.login(this.loginForm.value as LoginForm).subscribe({
      next: () => {
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem(
            'email',
            this.loginForm.get('email')?.value as string
          );
        } else {
          localStorage.removeItem('email');
        }
        this.router.navigateByUrl('/');
      },
      error(err) {
        Swal.fire('Error', err.error.msg, 'error');
      },
    });
  }
}
