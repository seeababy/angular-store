import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { AppRoutesConfig } from '../../../app.routes-config';
import { Store } from '@ngxs/store';
import { BasketSelectors } from '../../../core/ngxs/basket/basket.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatIcon, RouterLink],
})
export class Header implements OnInit{
  private store = inject(Store);
  
  basketCount = this.store.selectSignal(BasketSelectors.totalCount);

  readonly AppRoutesConfig = AppRoutesConfig;

  ngOnInit(): void {
    this.store.select(BasketSelectors.totalCount).subscribe(count => {
      console.log('Basket total count:', count);
    })
  }
}
