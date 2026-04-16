import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OrderForm } from '../../components/order-form/order-form';
import { OrderList } from '../../components/order-list/order-list';
import { BasketSelectors } from '../../../../core/ngxs/basket/basket.selectors';
import { Store } from '@ngxs/store';
import { CreateOrder } from '../../../../core/ngxs/orders/orders.actions';
import { IMakeOrderForm } from '../../entities/interfaces/make-order-form.interface';
import { Router } from '@angular/router';
import { ClearCart } from '../../../../core/ngxs/basket/basket.actions';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-make-orders',
  templateUrl: './make-orders.html',
  styleUrl: './make-orders.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [OrderForm, OrderList, MatSnackBarModule],
})
export class MakeOrders {
  private store = inject(Store);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  total = this.store.selectSignal(BasketSelectors.total);

  formValue!: IMakeOrderForm;

  isFormValid = false;

  submitForm() {
    if (!this.formValue) return;

    this.store.dispatch(new CreateOrder(this.formValue)).subscribe({
      next: () => {
        this.snackBar.open('Замовлення підтверджено', 'OK', {
          duration: 3000,
        });
        this.store.dispatch(new ClearCart());
        this.router.navigate(['/basket']);
      },
      error: () => {
        this.snackBar.open('Сталася помилка при створенні замовлення', 'OK', {
          duration: 3000,
        });
      },
    });
  }
}
