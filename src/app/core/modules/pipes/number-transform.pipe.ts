import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberTransform',
})
export class NumberTransformPipe implements PipeTransform {
  transform(value: string | number): string | number {
    if (!value) return null;

    value = Number(value);

    switch (true) {
      case value < 1000: {
        return value;
      }

      case value < 1e6: {
        const result: number = value / 1e3;
        return this.dropZero(result.toFixed(1)) + 'K';
      }

      case value < 1e9: {
        const result: number = value / 1e6;
        return this.dropZero(result.toFixed(1)) + 'M';
      }

      default: {
        const result: number = value / 1e9;
        return this.dropZero(result.toFixed(1)) + 'B';
      }
    }
  }

  private dropZero(value: string) {
    const [integer, float = '0'] = value.split('.');
    const result = `${integer}${float === '0' ? '' : '.' + float}`;

    return result;
  }
}
