import { AnimationQueryOptions } from '@angular/animations';

export function queryOptions(
  opts: AnimationQueryOptions = {}
): AnimationQueryOptions {
  return Object.assign({ optional: true }, opts);
}
