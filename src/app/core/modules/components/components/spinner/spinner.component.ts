import { Component, Input } from '@angular/core';

@Component({
  selector: 'ng-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  @Input() public mode: 'fixed' | 'default' = 'default';
  @Input() public diameter: number | string = 90;
  @Input() public strokeWidth: number | string = 0;
}
