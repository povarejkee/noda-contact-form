import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  TemplateRef,
} from '@angular/core';
import { ANShowFade } from '@core/animations/animations';
import { randomid } from '@core/handlers/shared.handlers';
import { suffix } from '@core/handlers/string.handlers';
import { ISimple } from '@core/interfaces/ISimple';
import { TSide } from '@core/types/state.types';
import { TOffestCoords } from '@core/types/view.types';

@Component({
  selector: 'ng-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ANShowFade()],
})
export class PopupComponent {
  public id: string = randomid();
  public templateOutlet: TemplateRef<any>;
  public templateContext: any;
  public isShow: boolean = false;
  public offset: TOffestCoords;
  public coords: DOMRect;
  public placement: TSide;

  constructor(private cdr: ChangeDetectorRef) {}

  public getStyles(): ISimple<string> {
    const { x, y } = this.offset;
    const { height, width, bottom, top, left, right } = this.coords;
    const widthCenter: number = left + width / 2;
    const heightCenter: number = top + height / 2;

    const translateX: string = `calc(-50% + ${x})`;
    const translateY: string = `calc(-50% + ${y})`;

    switch (this.placement) {
      case 'top': {
        const transform: string = `translate(${translateX}, calc(-100% + ${y}))`;
        return {
          left: suffix(widthCenter, 'px'),
          top: suffix(top, 'px'),
          transform,
        };
      }
      case 'bottom': {
        const transform: string = `translate(${translateX}, ${y})`;

        return {
          left: suffix(widthCenter, 'px'),
          top: suffix(bottom, 'px'),
          transform,
        };
      }
      case 'left': {
        const transform: string = `translate(calc(-100% + ${x}), ${translateY})`;
        return {
          left: suffix(left, 'px'),
          top: suffix(heightCenter, 'px'),
          transform,
        };
      }
      case 'right': {
        const transform: string = `translate(${x}, ${translateY})`;
        return {
          left: suffix(right, 'px'),
          top: suffix(heightCenter, 'px'),
          transform,
        };
      }
    }
  }

  public getShowState(): boolean {
    return this.isShow;
  }

  public setShowState(flag: boolean): void {
    this.isShow = flag;
  }

  public setCoords(coords: DOMRect): void {
    this.coords = coords;
  }

  public detect(): void {
    this.cdr.detectChanges();
  }
}
