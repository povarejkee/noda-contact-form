import { NgModule } from '@angular/core';
import { AffixPipe } from './affix.pipe';
import { AssetsImgUrlPipe } from './assets-img-url.pipe';
import { BooleanPipe } from './boolean.pipe';
import { ConditionPipe } from './condition.pipe';
import { DefaultValuePipe } from './default-value.pipe';
import { DefinedPipe } from './defined.pipe';
import { EndsWithPipe } from './ends-with.pipe';
import { EqualPipe } from './equal.pipe';
import { ExcludePropertiesPipe } from './exclude-properties.pipe';
import { ExistPipe } from './exist.pipe';
import { FilterPipe } from './filter.pipe';
import { IncludesPipe } from './includes.pipe';
import { JSTypePipe } from './js-type.pipe';
import { MapPipe } from './map.pipe';
import { NotDefinedPipe } from './not-defined.pipe';
import { NotEqualPipe } from './not-equal.pipe';
import { NotExistPipe } from './not-exist.pipe';
import { NumberTransformPipe } from './number-transform.pipe';
import { PickMapPipe } from './pick-map.pipe';
import { PickPipe } from './pick.pipe';
import { PluckPipe } from './pluck.pipe';
import { ReplaceDefaultPipe } from './replace-default.pipe';
import { SanitizerPipe } from './sanitizer.pipe';
import { SplitStringPipe } from './split-str.pipe';
import { SymbolLimit } from './symbol-limit.pipe';
import { TypeParser } from './type-parser.pipe';
import { UrlPipe } from './url.pipe';

const declarations = [
  AssetsImgUrlPipe,
  SplitStringPipe,
  SanitizerPipe,
  UrlPipe,
  ReplaceDefaultPipe,
  BooleanPipe,
  DefinedPipe,
  ConditionPipe,
  DefaultValuePipe,
  EqualPipe,
  NotEqualPipe,
  IncludesPipe,
  PickPipe,
  SymbolLimit,
  MapPipe,
  TypeParser,
  JSTypePipe,
  AffixPipe,
  ExcludePropertiesPipe,
  FilterPipe,
  PluckPipe,
  PickMapPipe,
  EndsWithPipe,
  NotDefinedPipe,
  ExistPipe,
  NotExistPipe,
  NumberTransformPipe,
];

@NgModule({
  declarations,
  exports: declarations,
})
export class PipesModule {}
