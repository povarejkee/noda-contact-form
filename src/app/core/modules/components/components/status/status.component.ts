import { Component, Input } from '@angular/core';

import { TStatusTag } from '@core/modules/components/components/status/status.types';

@Component({
  selector: 'ng-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent {
  public type: TStatusTag;
  public iconName: string;

  @Input() public title: string;

  @Input('type') private set _type(value: TStatusTag) {
    this.type = value;
    this.setIconName(value);
  }

  private setIconName(status: TStatusTag): void {
    switch (status) {
      case 'default':
        this.iconName = 'access_time_filled';
        break;

      case 'success':
        this.iconName = 'check_circle';
        break;

      case 'warning_exclamation':
        this.iconName = 'remove_circle';
        break;

      case 'warning_dash':
        this.iconName = 'error';
        break;

      case 'error':
        this.iconName = 'cancel';
    }
  }
}
