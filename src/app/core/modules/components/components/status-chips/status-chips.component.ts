import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TStatus } from '@core/types/state.types';

@Component({
  selector: 'ng-status-chips',
  templateUrl: './status-chips.component.html',
  styleUrls: ['./status-chips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusChipsComponent {
  @Input() public status: Exclude<TStatus, 'primary'> = 'default';
  @Input() public text: string;
}
