import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatIcon, TranslateModule],
})
export class Footer { }
