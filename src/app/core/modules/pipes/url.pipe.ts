import { Pipe, PipeTransform } from '@angular/core';
import { EnURL } from '@core/enums/app.enum';
import { joinUrl } from '@core/handlers/string.handlers';
import { environment } from '@env/environment';
import { TUrl } from './pipes.types';

@Pipe({
  name: 'url',
})
export class UrlPipe implements PipeTransform {
  transform(value: string, type: TUrl): string {
    switch (type) {
      case 'assets': {
        return joinUrl([environment.APP_IMG, value]);
      }
      case 'cdn': {
        return joinUrl([EnURL.CDN, value]);
      }
      case 'country-flag': {
        //  ? value === countryCode
        return `${EnURL.STORE_HOST}/flags/${(
          value as string
        )?.toLocaleLowerCase()}.svg`;
      }
    }
  }
}
