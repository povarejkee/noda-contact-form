import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ISimple } from '@core/interfaces/ISimple';

@Component({
  selector: 'ng-border-wrapper',
  templateUrl: './border-wrapper.component.html',
  styleUrls: ['./border-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BorderWrapperComponent {
  @Input() private height: string = '64px';
  @Input() private width: string = '56px';
  @Input() public contentPadding: string = `0 ${this.width}`;

  public getSize(): ISimple<string> {
    const { height, width } = this;

    return { height, width };
  }
}
