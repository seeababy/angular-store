import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { AppRoutesConfig } from '../../../app.routes-config';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatIcon, RouterLink],
})
export class Header {
  readonly AppRoutesConfig = AppRoutesConfig;
}
