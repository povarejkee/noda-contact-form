import { NgModule } from '@angular/core';
import { AsyncDirective } from './async.directive';
import { ClosestDirective } from './closest.directive';
import { CopyDirective } from './copy.directive';
import { LinkDirective } from './link.directive';
import { LoaderDirective } from './loader.directive';
import { PageEndpointDirective } from './page-endpoint.directive';
import { SelectorStylesDirective } from './selector-styles.directive';
import { SwitchContainCaseDirective } from './switch-contain-case.directive';
import { SwitchContainDefault } from './switch-contain-default.directive';
import { SwitchContainDirective } from './switch-contain.directive';
import { ToggleCssClassDirective } from './toggle-css-class.directive';
import { TrackByKeyDirective } from './track-by-key.directive';
import { ValueDirective } from './value.directive';

const declarations = [
  AsyncDirective,
  PageEndpointDirective,
  LoaderDirective,
  SwitchContainDirective,
  SwitchContainCaseDirective,
  SwitchContainDefault,
  ClosestDirective,
  ValueDirective,
  ToggleCssClassDirective,
  LinkDirective,
  SelectorStylesDirective,
  CopyDirective,
  TrackByKeyDirective,
];

@NgModule({
  declarations,
  exports: declarations,
})
export class DirectivesModule {}
