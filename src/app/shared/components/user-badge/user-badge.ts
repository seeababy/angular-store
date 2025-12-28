import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { AppRoutesConfig } from '../../../app.routes-config';
import { Router, RouterLink } from "@angular/router";
import { MatMenuTrigger, MatMenu } from '@angular/material/menu';
import { Store } from '@ngxs/store';
import { UserSelectors } from '../../../core/ngxs/user/user.selectors';
import { Logout } from '../../../core/ngxs/user/user.actions';

@Component({
  selector: 'app-user-badge',
  templateUrl: './user-badge.html',
  styleUrl: './user-badge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatIcon, RouterLink, MatMenuTrigger, MatMenu],
})
export class UserBadge {
  private store = inject(Store);
  private router = inject(Router);
  AppRoutesConfig = AppRoutesConfig;

  isAuthorized = this.store.selectSignal(UserSelectors.isAuthorized);

  logout() {
    this.store.dispatch(new Logout());
    this.router.navigate(['/', AppRoutesConfig.Home]);
  }
}
