import { Inject, Injectable } from '@angular/core';
import { WINDOW } from '@core/injection/app.tokens';
import { StorageService } from '@core/services/storage.service';
import { GoogleEvent } from './classes/GoogleEvent';
import { EnGoogle } from './enums/google.enums';

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  private dataLayer: GoogleEvent[];

  constructor(
    @Inject(WINDOW) private window: Window,
    private storage: StorageService
  ) {
    this.init();
  }

  private init(): void {
    // @ts-ignore
    if (!this.window.dataLayer) {
      // @ts-ignore
      this.window.dataLayer = [];
    }

    // @ts-ignore
    this.dataLayer = this.window.dataLayer;
  }

  public generateEvent(options: Partial<GoogleEvent>): GoogleEvent {
    return new GoogleEvent(options);
  }

  public updateLayer(options: Partial<GoogleEvent>): void {
    const event: GoogleEvent = this.generateEvent(options);

    this.dataLayer.push(event);
    this.storage.remove(EnGoogle.STORAGE_KEY);
  }
}
