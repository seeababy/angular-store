import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { Header } from "../../../../shared/layout/header/header";
import { Footer } from "../../../../shared/layout/footer/footer";
import { MobileSideMenu } from "../../../../shared/layout/mobile-side-menu/mobile-side-menu";


@Component({
  selector: 'app-layout',
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterOutlet, Header, Footer, MobileSideMenu],
})
export class Layout { 
  isSideMenuOpened = false;

  toggleSideMenu(value: boolean) {
    this.isSideMenuOpened = value;
    const bodyElement = document.body;
    if (value) {
      bodyElement.classList.add('no-scroll');
    } else {
      bodyElement.classList.remove('no-scroll');
    }
  }


}

