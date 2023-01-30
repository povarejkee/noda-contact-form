import { NgForOf } from '@angular/common';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[ngFor]',
})
export class TrackByKeyDirective<T extends any = any> {
  @Input('ngForTrackByKey') public set ngForTrackByKey(key: keyof T) {
    this.ngFor.ngForTrackBy = (index: number, item: T) => item?.[key] ?? index;
  }

  constructor(private ngFor: NgForOf<T>) {}
}
