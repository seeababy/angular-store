import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OfficeSideMenu } from "../../components/office-side-menu/office-side-menu";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-office-page',
  standalone: true,
  imports: [OfficeSideMenu, RouterOutlet],
  templateUrl: './office-page.html',
  styleUrl: './office-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfficePage { }
