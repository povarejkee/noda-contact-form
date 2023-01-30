import { assign, randomid } from '@core/handlers/shared.handlers';
import { pickObjectProps } from '@core/handlers/utility.handlers';
import { environment } from '@env/environment';
import { INodaPaymentRequest } from '../INodaPaymentRequest';

export class NodaPaymentRequest implements INodaPaymentRequest {
  public apiKey: string = null;
  public sortCode: string = null;
  public routingNumber: string = null;
  public customerId: string = randomid()
  public currency: string = 'GBP';
  public amount: number = 100;
  public iin: number = 0;
  public description: string = 'Test payment';
  public country: string = 'gb';
  public paymentId: string = '0122';
  public disabled: boolean = false;
  public returnUrl: string = 'https://ui.noda.live/processing/result';
  public env: string = environment.APP_ENV;

  constructor(...settings: Partial<NodaPaymentRequest>[]) {
    const configProps: Partial<any> = pickObjectProps(
      this,
      assign(...settings)
    );

    Object.assign(this, configProps);
  }

  public get(): INodaPaymentRequest {
    return this;
  }
}
