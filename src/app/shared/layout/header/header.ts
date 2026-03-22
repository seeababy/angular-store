import { ChangeDetectionStrategy, Component, effect, inject, output, signal } from '@angular/core'; // NEW effect
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { AppRoutesConfig } from '../../../app.routes-config';
import { Store } from '@ngxs/store';
import { BasketSelectors } from '../../../core/ngxs/basket/basket.selectors';
import { UserBadge } from "../../components/user-badge/user-badge";
import { ClickOutside } from '../../directives/click-outside';
import { UserSelectors } from '../../../core/ngxs/user/user.selectors'; // NEW

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatIcon, RouterLink, UserBadge, ClickOutside],
})
export class Header {

  store = inject(Store);

  basketCount = this.store.selectSignal(BasketSelectors.totalCount);
  AppRoutesConfig = AppRoutesConfig;
  emitBurgerClick = output<void>();
  isFloating = false;

  userId = this.store.selectSignal(UserSelectors.userId);
  isAuthorized = this.store.selectSignal(UserSelectors.isAuthorized);
  searchHistory: string[] = [];

  constructor() {

    effect(() => {

      const id = this.userId();
      const authorized = this.isAuthorized();

      if (!authorized || !id) {
        this.searchHistory = [];
        return;
      }

      const history = localStorage.getItem(`searchHistory:${id}`);
      this.searchHistory = history ? JSON.parse(history) : [];

    });
  }

  openSearch(): void {
    this.isFloating = true;
    // document.body.classList.add('no-scroll');
  }

  submitSearch(query?: string): void {

    if (query) {
      this.addToSearchHistory(query);
    }

    this.isFloating = false;
    // document.body.classList.remove('no-scroll');
  }

  addToSearchHistory(query: string): void {

    const id = this.userId();
    if (!id || !query.trim()) {
      return;
    }

    this.searchHistory = this.searchHistory.filter(q => q !== query);
    this.searchHistory.unshift(query);

    if (this.searchHistory.length > 5) {
      this.searchHistory.pop();
    }

    localStorage.setItem(`searchHistory:${id}`,JSON.stringify(this.searchHistory));
  }
}



