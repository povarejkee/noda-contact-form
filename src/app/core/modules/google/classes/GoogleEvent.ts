import { GoogleEventParams } from '../types/google.types';

export class GoogleEvent {
  public event: string = 'nodalead_common';
  public category: string = '';
  public params: GoogleEventParams = {};
  public visitorType: string = 'high_value';

  constructor(eventOptions: Partial<GoogleEvent>) {
    Object.assign(this, eventOptions);
  }
}
