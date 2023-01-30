import { FormGroup } from '@angular/forms';
import { isJSType } from '@core/handlers/condition.handlers';
import { getRange, isDisabledForm } from '../handlers/form.handlers';
import { IValidationLength } from '../interfaces/IValidationLength';
import { TRange } from '../types/form.types';

export function RequiredRange(
  validationMap: IValidationLength
): MethodDecorator {
  return (
    target: object,
    methodName: string,
    descriptor: PropertyDescriptor
  ) => {
    descriptor.value = function (controlName: string, rangeType: TRange) {
      return getRange(validationMap, controlName, rangeType);
    };

    return descriptor;
  };
}

export function Bind(ctx?: unknown): MethodDecorator {
  return (
    target: object,
    methodName: string,
    descriptor: PropertyDescriptor
  ) => {
    const { value: originalMethod } = descriptor;

    return {
      get() {
        return originalMethod.bind(ctx ?? this);
      },
    };
  };
}

export function DisabledFormStatus<F extends (form: FormGroup) => boolean>(
  formKey: string = 'form',
  callbacks: (string | F)[] = []
): PropertyDecorator {
  return function (target: object, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      get: function () {
        const disabled: boolean = callbacks
          .map((cb) =>
            typeof cb === 'string' ? this[cb]() : cb(this[formKey])
          )
          .some(Boolean);

        return isDisabledForm(this[formKey]) || disabled;
      },
    });
  };
}

export function BindContext(
  cb: string | Function,
  ...args: any[]
): PropertyDecorator {
  return function (target: object, propName: string) {
    Object.defineProperty(target, propName, {
      get: function () {
        const handler: Function = isJSType(cb, 'string')
          ? this[cb as string]
          : cb;

        if (handler) return handler.apply(this, args);

        throw new Error(`Handler by key "${cb}" is not defined`);
      },
    });
  };
}
