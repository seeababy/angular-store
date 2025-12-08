import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { Auth } from '../../services/auth';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

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

  formGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  submit() {
    if (this.formGroup.invalid) return;

    const data = this.formGroup.value;

    this.auth.login(data).subscribe(res => {
      console.log('Login success:', res);

      this.formGroup.reset();

      this.cdr.detectChanges();
    });
  }
}
