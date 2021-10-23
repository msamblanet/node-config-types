import extend from 'extend';
import type { PartialDeep } from 'type-fest';

export type IConfig = {}; // eslint-disable-line @typescript-eslint/ban-types
export type Override<X> = undefined | null | PartialDeep<X>;
export type Overrides<X> = Array<Override<X>>;
export abstract class BaseConfigurable<X extends IConfig> {
  public static mergeOptions<Y>(defaults: Y, ...overrides: Overrides<Y>): Y {
    return extend(true, {}, defaults, ...overrides) as Y;
  }

  protected config: X;

  protected constructor(defaults: X, ...overrides: Overrides<X>) {
    this.config = BaseConfigurable.mergeOptions<X>(defaults, ...overrides);
  }
}
export default BaseConfigurable;
