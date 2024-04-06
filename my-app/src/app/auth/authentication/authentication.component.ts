import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import Swal from 'sweetalert2';
import { ROUTES_APP } from '../../core/enum/routes.enum';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router) { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  get login() {
    return this.loginForm.get('login')
  }
  get password() {
    return this.loginForm.get('password')
  }
  logIn() {

    if (!this.loginForm.valid) {
      return;
    }
    const data = this.loginForm.value;
    this.authService.login(data).subscribe({
      next: (res: any) => {
        if (res && res.user) {
          const { name, login, password } = res.user;
          Swal.fire({
            icon: "success",
            html: `Welcome ${name}`,
          }).then(() => {
            this.router.navigateByUrl(ROUTES_APP.CUSTOMERS);
          });
        }
      },
      error: (err: any) => {
        Swal.fire({
          icon: "error",
          html: `${err.error.msg}`,
        })
        console.log(err.error.msg);
      }
    });
    console.log(this.loginForm.value);
  }
}
