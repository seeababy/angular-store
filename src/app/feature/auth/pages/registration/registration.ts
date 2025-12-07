import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { Auth } from '../../services/auth';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

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

  formGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  submit() {
    if (this.formGroup.invalid) return;

    const data = this.formGroup.value;

    this.auth.registration(data).subscribe(res => {
      console.log('Registration success:', res);

      this.formGroup.reset();

      this.cdr.detectChanges();
    });
  }
}