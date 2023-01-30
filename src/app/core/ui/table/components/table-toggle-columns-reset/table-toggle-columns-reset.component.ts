import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'ng-table-toggle-columns-reset',
  templateUrl: './table-toggle-columns-reset.component.html',
  styleUrls: ['./table-toggle-columns-reset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableToggleColumnsResetComponent {
  @Output('reset') private _reset = new EventEmitter<void>();

  public reset(): void {
    this._reset.emit();
  }
}
