import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ng-download-icon',
  templateUrl: './download-icon.component.html',
  styleUrls: ['./download-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadIconComponent {
  @Input() public url: string;
  @Input() public disabled: boolean = false;
}
