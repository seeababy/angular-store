import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { Auth } from '../../services/auth';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { LoginData } from '../entities/login.interface';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { AppRoutesConfig } from '../../../../app.routes-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
})
export class Login {
  auth = inject(Auth);
  cdr = inject(ChangeDetectorRef);
  router = inject(Router);

  formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  submit() {
    if (this.formGroup.invalid) return;

    this.auth.login(this.formGroup.value as LoginData).pipe(
      catchError(() => of(null)),
    ).subscribe(res => {
      if (res !== null) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/', AppRoutesConfig.Home]);
      };
          this.formGroup.reset();
    });
  }
}
