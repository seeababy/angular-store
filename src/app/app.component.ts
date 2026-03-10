import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/layout/header/header';
import { Footer } from './shared/layout/footer/footer';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { BaseIcons } from './core/icons/base-icons';
import { Store } from '@ngxs/store';
import { UserSelectors } from './core/ngxs/user/user.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';
import { GetViewedProducts } from './core/ngxs/products/products.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private iconRegistry = inject(MatIconRegistry);
  private sanitizer = inject(DomSanitizer);
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.registerIcons(BaseIcons, 'assets/icons/', '.svg');
  }

  ngOnInit(): void {
    this.handleRecentlyViewedProducts();
  }

  private registerIcons(icons: string[], path: string, ext = ''): void {
    icons.forEach((icon) => {
      this.iconRegistry.addSvgIcon(
        icon,
        this.sanitizer.bypassSecurityTrustResourceUrl(`${path}${icon}${ext}`),
      );
    });
  }

  private handleRecentlyViewedProducts(): void {
    this.store
      .select(UserSelectors.isAuthorized)
      .pipe(filter(Boolean), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.store.dispatch(new GetViewedProducts()));
  }
}
