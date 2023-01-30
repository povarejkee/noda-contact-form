import { isNotEqual } from '@core/handlers/condition.handlers';
import { SwitchContainCaseDirective } from './switch-contain-case.directive';
import { SwitchContainDefault } from './switch-contain-default.directive';
import {
  AfterViewInit,
  ContentChild,
  ContentChildren,
  Directive,
  Input,
  QueryList,
} from '@angular/core';

@Directive({
  selector: '[ngSwitchContain]',
})
export class SwitchContainDirective implements AfterViewInit {
  private isViewInit: boolean = false;
  private switchValue: unknown;
  private currentCase$: SwitchContainCaseDirective | SwitchContainDefault;

  @ContentChild(SwitchContainDefault)
  private defaultCase$: SwitchContainDefault;
  @ContentChildren(SwitchContainCaseDirective)
  private caseRefs$: QueryList<SwitchContainCaseDirective>;
  @Input('ngSwitchContain')
  private set _switchValue(value: unknown) {
    this.switchValue = value;
    if (this.isViewInit && isNotEqual(value, this.switchValue)) {
      this.repaintCases(value);
    }
  }

  ngAfterViewInit() {
    this.isViewInit = true;
    this.repaintCases(this.switchValue);
  }

  public repaintCases(value: unknown): void {
    const caseRef$: SwitchContainCaseDirective | SwitchContainDefault =
      this.caseRefs$.find((case$) => case$.isContain(value)) ||
      this.defaultCase$;

    this.resetCurrentCase();

    if (caseRef$) {
      this.currentCase$ = caseRef$;
      this.currentCase$.insert();
    }
  }

  private resetCurrentCase(): void {
    if (this.currentCase$) {
      this.currentCase$.remove();
      this.currentCase$ = null;
    }
  }
}
