import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ANStyles } from '@core/animations/animations';

@Component({
  selector: 'ng-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    ANStyles({
      fromStyle: {
        transform: 'translateY(-30%)',
      },
      toStyle: {
        transform: 'translateY(0%)',
      },
      animationName: 'ANShowModal',
    }),
  ],
})
export class ModalComponent {
  @Input('header') public header: string;
  @Input('disabled') public disabled: boolean = false;
  @Input('loading') public loading: boolean = false;
  @Input('hideActions') public hideActions: boolean = false;
  @Input('actionText') public actionText: string = 'Edit';

  @Output('close') private _close = new EventEmitter<void>();
  @Output('save') private _save = new EventEmitter<void>();

  @ContentChild('actionsRef') public actionsRef: any;
  // TODO сделать универсальную анимацию
  // @HostBinding('ANStyles') private ANStyles: unknown;

  public close(): void {
    this._close.emit();
  }

  public save(): void {
    this._save.emit();
  }
}
