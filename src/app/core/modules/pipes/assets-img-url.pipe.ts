import { Pipe, PipeTransform } from '@angular/core';
import { joinUrl } from '@core/handlers/string.handlers';
import { environment } from '@env/environment';

@Pipe({
  name: 'assetsImg',
})
export class AssetsImgUrlPipe implements PipeTransform {
  transform(value: string): string {
    return joinUrl([environment.APP_IMG, value]);
  }
}
