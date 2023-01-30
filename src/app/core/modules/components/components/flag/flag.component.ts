import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ng-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlagComponent {
  @Input() public country: string;
  @Input() public size: 'small' | 'medium' | 'large' = 'small';
  @Input() public type: 'square' | 'circle' = 'circle';
}
