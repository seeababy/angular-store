import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  output,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { UserSelectors } from '../../../../core/ngxs/user/user.selectors';
import { max } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IMakeOrderForm } from '../../entities/interfaces/make-order-form.interface';

@Component({
  selector: 'app-order-form',
  standalone: true,
  templateUrl: './order-form.html',
  styleUrl: './order-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
})
export class OrderForm implements OnInit {
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  user = this.store.selectSignal(UserSelectors.user);

  formChanges = output<IMakeOrderForm>();
  formStatus = output<boolean>();

  formGroup!: FormGroup;

  ngOnInit() {
    this.initForm();
    this.formValidation();
    this.trackFormChanges();
    this.trackFormStatus();
  }

  private initForm() {
    this.formGroup = new FormGroup({
      address: new FormControl('', [Validators.required]),

      city: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-zА-Яа-яІіЇїЄєҐґ\s'-]+$/),
      ]),

      postalCode: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
        Validators.maxLength(6),
      ]),

      notes: new FormControl('', [Validators.maxLength(200)]),
    });
  }

  private formValidation() {
    this.formGroup
      .get('postalCode')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        const clean = value?.replace(/\D/g, '');
        this.formGroup.get('postalCode')?.setValue(clean.slice(0, 6), { emitEvent: false });
      });

    this.formGroup
      .get('city')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        const clean = value?.replace(/[^A-Za-zА-Яа-яІіЇїЄєҐґ\s'-]/g, '');

        if (value !== clean) {
          this.formGroup.get('city')?.setValue(clean, { emitEvent: false });
        }
      });
  }

  private trackFormChanges() {
    this.formGroup.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      this.formChanges.emit(value);
    });
  }

  private trackFormStatus() {
    this.formGroup.statusChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((status) => {
      this.formStatus.emit(status === 'VALID');
    });
  }
}
