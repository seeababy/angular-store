import { ChangeDetectionStrategy, Component, inject, OnInit, output } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { AppRoutesConfig } from '../../../app.routes-config';
import { Store } from '@ngxs/store';
import { BasketSelectors } from '../../../core/ngxs/basket/basket.selectors';
import { UserBadge } from "../../components/user-badge/user-badge";
import { ClickOutside } from '../../directives/click-outside';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatIcon, RouterLink, UserBadge, ClickOutside],
})
export class Header implements OnInit{
  store = inject(Store);
  basketCount = this.store.selectSignal(BasketSelectors.totalCount);
  AppRoutesConfig = AppRoutesConfig;
  emitBurgerClick = output<void>();
  isFloating = false;

  openSearch(): void {
    this.isFloating = true;
    document.body.classList.add('no-scroll');
  }

  submitSearch(): void {
    this.isFloating = false;
    document.body.classList.remove('no-scroll');
  }

  ngOnInit(): void {
    this.store.select(BasketSelectors.totalCount).subscribe(count => {
      console.log('Basket total count:', count);
    })
  }
}