import { Constructor, MixinInitializer } from '../types/managers.types';

export function ExtendsFactory<Mixins extends Array<unknown>>(...args: Mixins) {
  const mergedExtends = args.reduce((accum, instance) => {
    const prototype = Object.getPrototypeOf(instance);

    return Object.assign(accum, prototype);
  }, {});

  const Extender = class {
    constructor() {
      this._initializeFactory();
    }

    private _initializeFactory(): void {
      args.forEach((instance) => {
        // ? static property to instance constructor
        const { initializeMethod } = instance.constructor as MixinInitializer;

        if (initializeMethod) {
          (this as any)[initializeMethod]();
        }
      });
    }
  };

  Object.assign(Extender.prototype, mergedExtends);

  type Merge = Mixins['length'] extends 1 ? Mixins[0] : Mixins[0] & Mixins[1];

  return Extender as Constructor<Merge>;
}
