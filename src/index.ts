import extend from 'extend';
import type { DeepPartial } from 'tsdef'; // Do not use type-fest PartialDeep as it causes validation challenges if the type has unknowns

export type IConfig = {}; // eslint-disable-line @typescript-eslint/ban-types
export type Override<X> = undefined | null | DeepPartial<X>;
export type Overrides<X> = Array<Override<X>>;
export abstract class BaseConfigurable<X extends IConfig> {
  public static mergeOptions<Y>(defaults: Override<Y>, ...overrides: Overrides<Y>): Y {
    return extend(true, {}, defaults, ...overrides) as Y;
  }

  protected config: X;

  protected constructor(defaults: X, ...overrides: Overrides<X>) {
    this.config = BaseConfigurable.mergeOptions<X>(defaults, ...overrides);
  }
}
export default BaseConfigurable;
