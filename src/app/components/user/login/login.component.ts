import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginSuccess: boolean = true;

  constructor(private fb: FormBuilder, private authService: AuthService) {}
  submitForm(): void {
    if (this.loginForm.valid) {
      console.log('submit', this.loginForm.value);
      this.authService.login(
        this.loginForm.controls['email'].value,
        this.loginForm.controls['password'].value
      );
      this.loginSuccess = this.authService.succesfulLogin();
      console.log(this.loginSuccess);
    } else {
      Object.values(this.loginForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        null,
        [
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
          Validators.required,
        ],
      ],
      password: [null, [Validators.required]],
    });
  }
}
