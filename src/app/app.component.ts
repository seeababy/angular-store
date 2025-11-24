import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./shared/layout/header/header";
import { Footer } from "./shared/layout/footer/footer";
import {MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { BaseIcons } from './core/icons/base-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private iconRegistry = inject(MatIconRegistry);
  private sanitizer = inject(DomSanitizer);

  constructor() {
    this.registerIcons(BaseIcons, 'assets/icons/', '.svg');
  }

  private registerIcons(icons: string[], path: string, ext = ''): void {
    icons.forEach(icon => {
      this.iconRegistry.addSvgIcon(icon, this.sanitizer.bypassSecurityTrustResourceUrl(`${path}${icon}${ext}`));
    });
  }
}
