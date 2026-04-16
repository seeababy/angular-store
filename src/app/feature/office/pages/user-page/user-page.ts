import { ChangeDetectionStrategy, Component, OnInit, DestroyRef, inject, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { UserSelectors } from '../../../../core/ngxs/user/user.selectors';
import { UpdateMe } from '../../../../core/ngxs/user/user.actions';
import { IUser } from '../../../../core/entities/interfaces/user.interface';

@Component({
  selector: 'app-user-page',
  standalone: true,
  templateUrl: './user-page.html',
  styleUrl: './user-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
  ],
})
export class UserPage implements OnInit {
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);
  private snackBar = inject(MatSnackBar);
  private cdr = inject(ChangeDetectorRef);

  user = this.store.selectSignal(UserSelectors.user);
  shortName = this.store.selectSignal(UserSelectors.userShortName);
  color = this.store.selectSignal(UserSelectors.userColor);

  formGroup!: FormGroup;

  isEditMode = false;

  ngOnInit() {
    this.store
      .select(UserSelectors.user)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((user) => {
        if (user && !this.isEditMode) {
          this.setFormGroup(user);
        }
      });
  }

  toggleEdit() {
    this.isEditMode = !this.isEditMode;

    if (!this.isEditMode && this.user()) {
      this.setFormGroup(this.user()!);
    }
  }

  submit() {
    if (this.formGroup.invalid) return;

    const value = this.formGroup.value;

    const formatDate = (date: Date | null) => {
      if (!date) return '';

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    };

    this.store
      .dispatch(
        new UpdateMe({
          firstName: value.firstName || '',
          lastName: value.lastName || '',
          phoneNumber: value.phoneNumber || '',
          birthdayDate: formatDate(value.birthdayDate),
        }),
      )
      .subscribe({
        next: () => {
          this.snackBar.open('Дані збережено', 'OK', {
            duration: 3000,
          });

          this.formGroup.markAsPristine();
          this.isEditMode = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.snackBar.open('Сталася помилка', 'OK', {
            duration: 3000,
          });
        },
      });
  }

  private setFormGroup(user: IUser) {
    this.formGroup = new FormGroup({
      firstName: new FormControl(user.firstName, [Validators.required, Validators.maxLength(10)]),
      lastName: new FormControl(user.lastName, [Validators.required, Validators.maxLength(10)]),
      phoneNumber: new FormControl(user.phoneNumber || '+380', [
        Validators.required,
        Validators.pattern(/^\+380\d{9}$/),
      ]),
      birthdayDate: new FormControl(user.birthdayDate ? new Date(user.birthdayDate) : null, [
        Validators.required,
      ]),
    });

    this.formGroup
      .get('phoneNumber')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value: string) => {
        if (!value) return;

        if (!value.startsWith('+380')) {
          value = '+380';
          this.formGroup.get('phoneNumber')?.setValue(value, { emitEvent: false });
        }

        let digits = value.slice(4).replace(/\D/g, '');
        digits = digits.slice(0, 9);

        const formatted = '+380' + digits;

        if (value !== formatted) {
          this.formGroup.get('phoneNumber')?.setValue(formatted, { emitEvent: false });
        }
      });
  }
}
