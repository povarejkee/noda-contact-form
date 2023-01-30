import {
  animate,
  animateChild,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { EnAnimations } from '@core/animations/enums/animations.enum';
import { queryOptions } from '@core/animations/handlers/aniamtions.handlers';
// *Components

// *ng-form-select
export const ANShowListOptions = trigger('ANShowListOptions', [
  transition(':enter, :leave', [
    style({ overflow: 'hidden' }),
    query(
      ':enter, :leave',
      [stagger(EnAnimations.DEFAULT_STAGGER, [animateChild()])],
      queryOptions()
    ),
  ]),
]);

export const ANShowMultipleValue = trigger('ANShowMultipleValue', [
  transition(':enter', [
    style({ transform: 'translateY(100%)', height: '0px' }),
    animate(
      EnAnimations.DEFAULT_TIMING,
      style({ transform: 'translateY(0%)', height: '*' })
    ),
  ]),
  transition(':leave', [
    style({
      height: '0px',
      width: '0px',
      paddingBottom: '0px',
    }),
    animate(
      EnAnimations.DEFAULT_TIMING,
      style({
        transform: 'translateY(100%)',
        height: '0px',
        width: '0px',
        paddingBottom: '0px',
      })
    ),
  ]),
]);
// *ng-form-select

// *ng-form-errors

export const ANShowFormErrors = ANStyles({
  fromStyle: { opacity: '0', transform: 'translateY(-30%)' },
  toStyle: { opacity: '1', transform: 'translateY(0%)' },
  timingFrom: EnAnimations.DEFAULT_TIMING,
  animationName: 'ANShowFormErrors',
});

// *ng-form-errors

// *Components
