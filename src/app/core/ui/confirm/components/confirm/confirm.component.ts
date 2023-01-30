import { Component, HostBinding } from '@angular/core';
import {
  ANShowFade,
  ANShowTriggerQuery,
  ANStyles,
} from '@core/animations/animations';

@Component({
  selector: 'ng-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
  animations: [
    ANShowTriggerQuery(),
    ANShowFade(),
    ANStyles({
      fromStyle: {
        transform: 'translateY(-100%)',
        opacity: 0,
      },
      toStyle: {
        transform: 'translateY(0%)',
        opacity: 1,
      },
      animationName: 'ANShowPopup',
    }),
  ],
})
export class ConfirmComponent {
  public message: string;
  public loading: boolean = false;
  public showLoader: boolean = false;
  public answerCb: (r: boolean) => void;

  @HostBinding('@ANShowTriggerQuery') private ANShowTriggerQuery: unknown;

  public confrim(): void {
    this.loading = this.showLoader;
    this.answerCb(true);
  }
}
