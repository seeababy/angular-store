import { TranslateModule } from '@ngx-translate/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-social-networks',
  standalone: true,
  imports: [TranslateModule, MatIcon],
  templateUrl: './social-networks.html',
  styleUrl: './social-networks.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialNetworks { }
