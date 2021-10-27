import { Overrides, mergeOptions, BaseLoggingConfigurable } from './src/index.js'; // '@msamblanet/node-config-types';

export type IExampleLogger = unknown;

// ********************************************************

export interface FooConfig {
  a: number;
  b: number;
}

export class SimpleFoo extends BaseLoggingConfigurable<FooConfig, IExampleLogger> {
  public static readonly DEFAULT_CONFIG = { a: 1, b: 2 };

  public constructor(log: IExampleLogger, ...config: Overrides<FooConfig>) {
    super(log, SimpleFoo.DEFAULT_CONFIG, ...config);
  }

  public someMethod(): number {
    return this.config.a + this.config.b;
  }
}

// ********************************************************

export interface AbstractFooConfig {
  a: number;
  b: number;
}

export abstract class AbstractFoo<X extends AbstractFooConfig = AbstractFooConfig> extends BaseLoggingConfigurable<X, IExampleLogger> {
  public static readonly DEFAULT_CONFIG = { a: 1, b: 2 };

  public constructor(log: IExampleLogger, defaults: X, ...overrides: Overrides<X>) {
    super(log, defaults, ...overrides);
  }

  public abstract someMethod(): number;
}

// ********************************************************

export interface ConcreteFooConfig extends AbstractFooConfig {
  c: number;
}

export class ConcreteFoo extends AbstractFoo<ConcreteFooConfig> {
  public static readonly DEFAULT_CONFIG: ConcreteFooConfig = mergeOptions<ConcreteFooConfig>(AbstractFoo.DEFAULT_CONFIG, {
    b: 42,
    c: 3
  });

  public constructor(log: IExampleLogger, ...overrides: Overrides<ConcreteFooConfig>) {
    super(log, ConcreteFoo.DEFAULT_CONFIG, ...overrides);
  }

  public someMethod(): number {
    return this.config.a + this.config.b + this.config.c;
  }
}
