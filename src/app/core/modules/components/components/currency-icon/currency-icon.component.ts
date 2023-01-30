import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TCurrency } from '@store/types/store.types';

@Component({
  selector: 'ng-currency-icon',
  templateUrl: './currency-icon.component.html',
  styleUrls: ['./currency-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyIconComponent {
  public icon: string;

  @Input('currency') private set _currency(value: TCurrency) {
    switch (value) {
      case 'GBP': {
        this.icon = 'currency_pound';
        break;
      }
      case 'EUR': {
        this.icon = 'euro';
        break;
      }
    }
  }
}
