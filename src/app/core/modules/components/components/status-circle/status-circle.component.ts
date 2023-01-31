import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { getDataFromDB } from '@core/handlers/shared.handlers';
import { TStatus } from '@core/types/state.types';
import { ComponentsDB } from '../../db/components.db';

@Component({
  selector: 'ng-status-circle',
  templateUrl: './status-circle.component.html',
  styleUrls: ['./status-circle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusCircleComponent implements OnInit {
  public icons: Record<TStatus, string> = getDataFromDB(
    ['status-circle', 'icons'],
    ComponentsDB
  );

  @Input('status') public status: TStatus = 'default';
  @Input('customIcons') private customIcons: Partial<Record<TStatus, string>> =
    null;

  ngOnInit(): void {
    this.mergeCustomIcons();
  }

  private mergeCustomIcons(): void {
    Object.assign(this.icons, this.customIcons);
  }
}
