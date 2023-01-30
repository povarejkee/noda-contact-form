import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ANStyles } from '@core/animations/animations';
import { ISimple } from '@core/interfaces/ISimple';
import { TButton, TIcon, TSize } from '@core/types/state.types';

@Component({
  selector: 'ng-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    ANStyles({
      fromStyle: {
        width: '0',
        opacity: '0',
        overflow: 'hidden',
      },
      toStyle: {
        width: '*',
        opacity: '1',
        overflow: 'hidden',
      },
      animationName: 'ANShowSpinner',
    }),
  ],
})
export class ButtonComponent {
  @Input() public text: string = 'Fill in the text';
  @Input() public size: TSize = 'medium';
  @Input() public disabled: boolean = false;
  @Input() public icon: string = null;
  @Input() public iconType: TIcon = null;
  @Input() public type: TButton = 'button';
  @Input() public loading: boolean = false;
  @Input() public fullWidth: boolean = false;
  @Input() public appearance: 'raised' | 'stroke' = 'raised';

  @Output('action') private _action = new EventEmitter<void>();

  public get disabledBtn(): boolean {
    return this.disabled || this.loading;
  }

  public getClasses(): ISimple<boolean> {
    const { size, fullWidth, appearance } = this;
    return {
      [size]: true,
      [appearance]: true,
      'full-width': fullWidth,
    };
  }

  public action(): void {
    this._action.emit();
  }
}
