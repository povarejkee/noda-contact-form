import { NgControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { TErrorStrategy } from '../types/form.types';

export class ErrorMatcher implements ErrorStateMatcher {
  constructor(
    public control: NgControl,
    private cb: () => boolean = () => false,
    private strategy: TErrorStrategy
  ) {}

  public isErrorState(): boolean {
    switch (this.strategy) {
      case 'pristine': {
        return this.pristineStrategy();
      }
      default: {
        return this.defaultStrategy();
      }
    }
  }

  public setStrategy(strategy: TErrorStrategy): void {
    this.strategy = strategy;
  }

  private defaultStrategy(): boolean {
    return this.control.invalid;
  }

  private pristineStrategy(): boolean {
    const { invalid, pristine, touched } = this.control;
    const isDisabled: boolean = Boolean(
      (this.control?.valueAccessor as any)?.disabled
    );

    const isShowErrors: boolean =
      (invalid && !pristine && touched && !isDisabled) || this.cb();

    return isShowErrors;
  }
}
