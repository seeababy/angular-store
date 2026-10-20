import { TranslateModule } from '@ngx-translate/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppRoutesConfig } from '../../../../app.routes-config';
import { MatIcon } from "@angular/material/icon";
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-office-side-menu',
  standalone: true,
  imports: [TranslateModule, MatIcon, RouterLink, RouterLinkActive],
  templateUrl: './office-side-menu.html',
  styleUrl: './office-side-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfficeSideMenu {
  readonly AppRoutesConfig = AppRoutesConfig;
}
