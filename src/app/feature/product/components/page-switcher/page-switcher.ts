import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterModule } from "@angular/router";
import { AppRoutesConfig } from '../../../../app.routes-config';

@Component({
  selector: 'app-page-switcher',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './page-switcher.html',
  styleUrl: './page-switcher.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSwitcher { 
  readonly AppRoutesConfig = AppRoutesConfig;
}
