import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Cache } from '@core/decorators/decorators';
import { ISimple } from '@core/interfaces/ISimple';
import { TIcon, TIconMode } from '@core/types/state.types';

@Component({
  selector: 'ng-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Input() public type: TIcon = 'filled';
  @Input() public icon: string;
  @Input() public mode: TIconMode = 'material';

  public getMaterialIconClass(): ISimple<boolean> {
    let className: string = null;

    switch (this.type) {
      case 'filled': {
        className = 'material-icons';
        break;
      }
      case 'outlined': {
        className = 'material-icons-outlined';
        break;
      }
      case 'rounded': {
        className = 'material-icons-round';
        break;
      }
      case 'sharp': {
        className = 'material-icons-sharp';
        break;
      }
      case 'two-tone': {
        className = 'material-icons-two-tone';
        break;
      }
    }

    return { [className]: true };
  }

  @Cache()
  public getSocialMediaIconClass(icon: string): ISimple<boolean> {
    return {
      [icon]: true,
    };
  }
}
