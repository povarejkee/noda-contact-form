import {
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import { ANFade } from '@core/animations/animations';
import { EnAnimations } from '@core/animations/enums/animations.enum';
import { queryOptions } from '@core/animations/handlers/aniamtions.handlers';

export const MAX_Z_INDEX: string = '1000';

const hostStyles = style({
  position: 'relative',
  zIndex: MAX_Z_INDEX,
});
const containerStyles = query(
  '.shadow',
  [
    style({
      position: 'fixed',
      zIndex: MAX_Z_INDEX,
      overflow: 'hidden',
    }),
  ],
  queryOptions()
);
const contentStyles = query(
  '.shadow-content',
  [style({ position: 'static' })],
  queryOptions()
);
const staticStyles = [hostStyles, containerStyles, contentStyles];

export const ANShowShadow = trigger('ANShowShadow', [
  transition(':enter', [
    ...staticStyles,
    group([
      useAnimation(ANFade, { params: { timing: EnAnimations.DEFAULT_TIMING } }),
      query(':enter, @*', [animateChild()], queryOptions()),
    ]),
    ...staticStyles,
  ]),
  transition(':leave', [
    ...staticStyles,
    query(':leave, @*', [animateChild()], queryOptions()),
    useAnimation(ANFade, {
      params: {
        fromState: '1',
        toState: '0',
        timing: EnAnimations.DEFAULT_TIMING,
      },
    }),
    ...staticStyles,
  ]),
]);
