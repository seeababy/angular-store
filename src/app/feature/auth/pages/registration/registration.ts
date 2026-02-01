import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { Auth } from '../../services/auth';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RegistrationData } from '../entities/registration.interface';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { AppRoutesConfig } from '../../../../app.routes-config';
import { Store } from '@ngxs/store';
import { SetToken } from '../../../../core/ngxs/user/user.actions';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.html',
  styleUrl: './registration.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
})
export class Registration {

  auth = inject(Auth);
  cdr = inject(ChangeDetectorRef);
  router = inject(Router);
  store = inject(Store);

  formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\+380\d{9}$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  });

  submit() {
    if (this.formGroup.invalid) return;

    this.auth.registration(this.formGroup.value as RegistrationData).pipe(
      catchError(() => of(null)),
    ).subscribe(res => {
      if (res) {
        this.store.dispatch(new SetToken(res.data));
        this.router.navigate(['/', AppRoutesConfig.Home]);
      }

      this.formGroup.reset();
    });
  }
}

