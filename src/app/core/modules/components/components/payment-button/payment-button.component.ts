import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NodaPaymentRequest } from '@core/api/shared/payment/classes/NodaPaymentRequest.model';
import { getCurrency } from '@core/api/shared/payment/handlers/payment.handlers';
import { INodaPaymentRequest } from '@core/api/shared/payment/INodaPaymentRequest';
import { nativeElement } from '@core/handlers/shared.handlers';
import { ISimple } from '@core/interfaces/ISimple';
import { IMerchantDetails } from '@store/modules/merchants/interfaces/IMerchantDetails';

@Component({
  selector: 'ng-payment-button',
  templateUrl: './payment-button.component.html',
  styleUrls: ['./payment-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'paymentRef',
})
export class PaymentButtonComponent {
  public request: INodaPaymentRequest;
  public merchant: IMerchantDetails;

  @Input('merchant')
  public set _merchant(value: IMerchantDetails) {
    const country: string = value.country ? value.country.code : null;

    this.merchant = value;

    this.updateRequest({
      ...this.merchant,
      country,
    });
  }

  @Input('background')
  public set _background(value: string) {
    this.setColor(value);
  }

  @Input() public shadow: boolean;

  @Output('action') private _action = new EventEmitter<void>();

  @ViewChild('widgetRef') private widgetRef: ElementRef<any>;

  constructor(private cdr: ChangeDetectorRef) {}

  public getDecorationClasses(): ISimple<boolean> {
    const { shadow } = this;

    return {
      shadow,
    };
  }

  public action(): void {
    this._action.emit();
  }

  public changeCountry(country: string): void {
    const { locationId } = this.merchant;
    const currency: string = getCurrency(locationId);

    this.updateRequest({ country, currency });
  }

  public setColor(color: string): void {
    if (color) {
      setTimeout(() => {
        const rootEl$ = nativeElement(this.widgetRef);
        const el$: HTMLElement = rootEl$.querySelector('.__ndb__noda-wrapper');

        el$.style.backgroundColor = color;
        this.cdr.detectChanges();
      }, 0);
    }
  }

  public updateRequest(settings: Partial<NodaPaymentRequest>): void {
    if (settings) {
      this.request = new NodaPaymentRequest(this.request, settings);
      this.cdr.detectChanges();
    }
  }
}
