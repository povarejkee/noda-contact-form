import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'ng-icon-btn',
  templateUrl: './icon-btn.component.html',
  styleUrls: ['./icon-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconBtnComponent {
  @Input() public mode: 'theme' | 'default';
  @Input() public disabled: boolean = false;

  @Output() public action = new EventEmitter<void>();
}
