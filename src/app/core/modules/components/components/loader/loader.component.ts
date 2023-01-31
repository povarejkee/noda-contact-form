import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TSize } from '@core/types/state.types';

@Component({
  selector: 'ng-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  @Input('size') public size: Exclude<TSize, 'large'> = 'medium';
}
