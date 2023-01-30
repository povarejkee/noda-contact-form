import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { InitializeApiService } from '../services/initialize.api.service';
import { TApiUrl } from '../types/api.types';

export function initializeFactory(
  initilizeService: InitializeApiService
): () => Observable<boolean> {
  return () => initilizeService.initalize();
}

export function encryptKey(key: string, separator: string = '-') {
  if (key) {
    const splitKey: string[] = key.split(separator);
    const uncryptParts = splitKey.length - 1;
    const lastSymbols: string = key.slice(-uncryptParts);
    const hideParts: string = new Array(uncryptParts)
      .fill('****')
      .join(separator);

    return `${hideParts}-**${lastSymbols}`;
  }

  return '';
}

export function apiUrl(url: TApiUrl): string {
  return url.replace('@', environment.APP_HOST);
}
