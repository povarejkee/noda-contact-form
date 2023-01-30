import {
  animate,
  animateChild,
  animation,
  AnimationReferenceMetadata,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { EnAnimations } from './enums/animations.enum';
import { queryOptions } from './handlers/aniamtions.handlers';

export const ANFade: AnimationReferenceMetadata = animation(
  [
    style({ opacity: '{{ fromState }}' }),
    animate('{{ timing }}', style({ opacity: '{{ toState }}' })),
  ],
  {
    params: {
      timing: EnAnimations.DEFAULT_TIMING,
      fromState: '0',
      toState: '1',
    },
  }
);

export const ANTransform: AnimationReferenceMetadata = animation(
  [
    style({
      transform: '{{ fromState }}',
    }),
    animate('{{ timing }}', style({ transform: '{{ toState }}' })),
  ],
  {
    params: {
      timing: EnAnimations.DEFAULT_TIMING,
      fromState: 'translateY(-100%)',
      toState: 'translateY(0%)',
    },
  }
);

export const ANShowFade = ({
  timingFrom = '200ms ease-in',
  timingTo = timingFrom as string,
  animationName = 'ANShowFade',
} = {}) =>
  trigger(animationName, [
    transition(':enter', [
      style({ opacity: 0 }),
      animate(timingFrom, style({ opacity: 1 })),
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate(timingTo, style({ opacity: 0 })),
    ]),
  ]);

export const ANStyles = ({
  fromStyle = {},
  toStyle = {},
  timingFrom = EnAnimations.DEFAULT_TIMING as string,
  timingTo = timingFrom as string,
  animationName = 'ANStyles',
  enableLeave = true,
}) => {
  const transitions = [
    transition(`:enter`, [
      style(fromStyle),
      animate(timingFrom, style(toStyle)),
    ]),
  ];

  if (enableLeave) {
    transitions.push(transition(`:leave`, animate(timingTo, style(fromStyle))));
  }
  return trigger(animationName, transitions);
};

export const ANStylesHide = ({
  fromStyle = {},
  toStyle = {},
  timing = EnAnimations.DEFAULT_TIMING as string,
  animationName = 'ANStylesHide',
}) =>
  trigger(animationName, [
    transition(':leave', [style(fromStyle), animate(timing, style(toStyle))]),
  ]);

export const ANStylesState = ({
  fromStyle = {},
  fromState = '*',
  toStyle = {},
  toState = '*',
  timing = EnAnimations.DEFAULT_TIMING,
  animationName = 'ANStylesState',
}) => {
  return trigger(animationName, [
    state(fromState, style(fromStyle)),
    state(toState, style(toStyle)),
    transition(`${fromState}<=>${toState}`, animate(timing)),
  ]);
};

export const ANStylesQueryState = ({
  fromStyle = {},
  fromState = '*',
  toStyle = {},
  toState = '*',
  timing = EnAnimations.DEFAULT_TIMING as string,
  selectors = '@*',
  animationName = 'ANStylesState',
}) => {
  return trigger(animationName, [
    transition(`${fromState}=>${toState}`, [
      query(
        selectors,
        [style(fromStyle), animate(timing, style(toStyle))],
        queryOptions()
      ),
    ]),
    transition(`${toState}=>${fromState}`, [
      query(
        selectors,
        [style(toStyle), animate(timing, style(fromStyle))],
        queryOptions()
      ),
    ]),
  ]);
};

export const ANShowQuery = ({
  selectors = '@*',
  fromStyle = {},
  toStyle = {},
  timing = EnAnimations.DEFAULT_TIMING,
  animationName = 'ANShowQuery',
}) => {
  return trigger(animationName, [
    transition(':enter', [
      query(
        selectors,
        [style(fromStyle), animate(timing, style(toStyle))],
        queryOptions()
      ),
    ]),
    transition(':leave', [
      query(
        selectors,
        [style(toStyle), animate(timing, style(fromStyle))],
        queryOptions()
      ),
    ]),
  ]);
};

export const ANShowTriggerQuery = ({
  selectors = '@*',
  animationName = 'ANShowTriggerQuery',
} = {}) => {
  return trigger(animationName, [
    transition(':enter, :leave', [
      query(selectors, [animateChild()], queryOptions()),
    ]),
  ]);
};

export const ANRepeatState = ({
  fromState = '*',
  toState = '*',
  fromStyle = {},
  toStyle = {},
  timing = EnAnimations.DEFAULT_TIMING,
  animationName = 'ANRepeatState',
}) =>
  trigger(animationName, [
    transition(`${fromState} <=> ${toState}`, [
      style(fromStyle),
      animate(timing, style(toStyle)),
    ]),
  ]);
