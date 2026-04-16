import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [],
  templateUrl: './order-page.html',
  styleUrl: './order-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderPage { }
