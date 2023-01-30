import { Pipe, PipeTransform } from '@angular/core';
import { encryptKey } from '@core/api/handlers/api.handlers';

@Pipe({
  name: 'encrypt',
})
export class EncryptPipe implements PipeTransform {
  transform(value: string, isEncrypt: boolean = true): string {
    return isEncrypt ? encryptKey(value) : value;
  }
}
