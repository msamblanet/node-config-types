import { EventEmitter } from 'node:events';
import extend from 'extend';
import type { DeepPartial } from 'tsdef'; // Do not use type-fest PartialDeep as it causes validation challenges if the type has unknowns
import type { ILogAdapter } from '@msamblanet/node-slf';

export type IConfig = {}; // eslint-disable-line @typescript-eslint/ban-types
export type Override<X> = undefined | null | DeepPartial<X>;
export type Overrides<X> = Array<Override<X>>;

export function mergeOptions<Y>(defaults: Override<Y>, ...overrides: Overrides<Y>): Y {
  return extend(true, {}, defaults, ...overrides) as Y;
}

export abstract class BaseConfigurable<X extends IConfig = IConfig> {
  /**
   * @deprecated Since version 0.4.0 - use the stand-alone function instead
   */
  public static mergeOptions<Y>(defaults: Override<Y>, ...overrides: Overrides<Y>): Y {
    return mergeOptions(defaults, ...overrides);
  }

  protected readonly config: X;

  protected constructor(defaults: X, ...overrides: Overrides<X>) {
    this.config = mergeOptions<X>(defaults, ...overrides);
  }
}

export abstract class BaseEmittingConfigurable<X = IConfig> extends EventEmitter {
  protected readonly config: X;

  protected constructor(defaults: X, ...overrides: Overrides<X>) {
    super();
    this.config = mergeOptions<X>(defaults, ...overrides);
  }
}

export abstract class BaseLoggingConfigurable<X = IConfig, L = ILogAdapter> {
  protected readonly config: X;
  protected readonly log: L;

  protected constructor(log: L, defaults: X, ...overrides: Overrides<X>) {
    this.log = log;
    this.config = mergeOptions<X>(defaults, ...overrides);
  }
}

export abstract class BaseLoggingEmittingConfigurable<X = IConfig, L = ILogAdapter> extends EventEmitter {
  protected readonly config: X;
  protected readonly log: L;

  protected constructor(log: L, defaults: X, ...overrides: Overrides<X>) {
    super();
    this.log = log;
    this.config = mergeOptions<X>(defaults, ...overrides);
  }
}

const defaultExports = {
  mergeOptions,
  BaseConfigurable,
  BaseEmittingConfigurable,
  BaseLoggingConfigurable,
  BaseLoggingEmittingConfigurable
};

export default defaultExports;
