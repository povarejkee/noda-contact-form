import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { ANShowShadow } from './animations/shadow.animations';

@Component({
  selector: 'ng-shadow',
  templateUrl: './shadow.component.html',
  styleUrls: ['./shadow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ANShowShadow],
})
export class ShadowComponent {
  @Input('contentCenter') public contentCenter: boolean = true;
  @Input('disabled') public disabledClose: boolean = false;
  @Output('close') private _close: EventEmitter<void> = new EventEmitter();

  @HostBinding('@ANShowShadow') private ANShowShadow: unknown;

  public close(e: MouseEvent): void {
    const isCanClose: boolean = (e.target as HTMLElement).hasAttribute(
      'data-close-element'
    );
    if (isCanClose && !this.disabledClose) {
      this._close.emit();
    }
  }
}
