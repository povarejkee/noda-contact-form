import { of } from 'rxjs';

export function TrackBy<T extends unknown>(
  type: 'index' | 'property' | 'default' = 'index',
  propName?: keyof T
): MethodDecorator {
  return function (
    target: object,
    methodName: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    descriptor.value = function (index: number, item: T) {
      switch (type) {
        case 'index': {
          return index;
        }
        case 'property': {
          return item[propName!];
        }
        case 'default': {
          return item;
        }
      }
    };

    return descriptor;
  };
}

export function Cache(): MethodDecorator {
  return function (
    target: object,
    methodName: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const { value: originalValue } = descriptor;
    const store = new Map();

    return {
      value: function (...args: any[]) {
        const jsonArgs: string = JSON.stringify(args);
        const fromCache = store.get(jsonArgs);

        if (fromCache) {
          return fromCache;
        }

        const value = originalValue.apply(this, args);
        store.set(jsonArgs, value);

        return value;
      },
    };
  };
}

function InitializeOnInit(
  target: { ngOnInit: Function; __initializeHandlers__: Function[] },
  args: any[]
) {
  Object.defineProperty(target, '__initializeHandlers__', {
    value: [],
    enumerable: false,
    configurable: false,
    writable: false,
  });
  const { ngOnInit: originalOnInit } = target;
  Object.defineProperty(target, 'ngOnInit', {
    value: function () {
      target.__initializeHandlers__.forEach((handler) => {
        handler.call(this, args);
      });
      originalOnInit?.call(this);
    },
  });
}

export function Initialize(...args: any[]): MethodDecorator {
  return function (
    target: any,
    methodName: string | symbol,
    descriptor: PropertyDescriptor
  ): void {
    if (!target.__initializeHandlers__) {
      InitializeOnInit(target, args);
    }

    const { value: initializeHandler } = descriptor;
    target.__initializeHandlers__.push(initializeHandler);
  };
}

export function Enumerable(): MethodDecorator {
  return function (
    target,
    methodName,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    return { ...descriptor, enumerable: true };
  };
}

export function CacheHttp(): MethodDecorator {
  return (
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor => {
    let isRequest: boolean = false;
    const { value: originalRequest } = descriptor;

    return {
      get() {
        return (...params: any[]) => {
          if (!isRequest) {
            isRequest = true;

            return of();
          } else {
            return of();
          }
        };
      },
    };
  };
}

export function GetProp<T extends object = any>(object: T) {
  return function (
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    return {
      value: function <K extends keyof T>(prop: K): T[K] {
        if (!(prop in object)) {
          // TODO
          // @ts-ignore
          throw new Error(`Property "${prop}" not exist in object ${object}`);
        }

        return object[prop];
      },
    };
  };
}
