import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EnStatusIcon } from '@core/enums/statuses.enums';
import { ISimple } from '@core/interfaces/ISimple';
import { TSize, TStatus } from '@core/types/state.types';

@Component({
  selector: 'ng-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsComponent {
  @Input() public text: string;
  @Input() public status: TStatus = 'default';
  @Input() public size: TSize = 'small';
  @Input() public icon: string;

  public getIcon(): string {
    const { icon, status } = this;

    if (icon) return icon;

    switch (status) {
      case 'success': {
        return EnStatusIcon.SUCCESS;
      }
      case 'warning': {
        return EnStatusIcon.WARNING;
      }
      case 'error': {
        return EnStatusIcon.DANGER;
      }
      default: {
        return EnStatusIcon.DEAFAULT;
      }
    }
  }

  public getClasses(): ISimple<boolean> {
    const { status, size } = this;

    return {
      [status]: true,
      [size]: true,
    };
  }
}
