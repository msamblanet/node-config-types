import { IConfig, Overrides, BaseConfigurable } from './src/index.js'; // '@msamblanet/node-config-types';

type Logger = unknown; // Placeholder type for this example

// ********************************************************

export interface FooConfig extends IConfig {
  a: number;
  b: number;
}

export class SimpleFoo extends BaseConfigurable<FooConfig> {
  public static readonly DEFAULT_CONFIG = { a: 1, b: 2 };

  protected readonly log: Logger;

  public constructor(log: Logger, ...config: Overrides<FooConfig>) {
    super(SimpleFoo.DEFAULT_CONFIG, ...config);
    this.log = log;
  }

  public someMethod(): number {
    return this.config.a + this.config.b;
  }
}

// ********************************************************

export interface AbstractFooConfig extends IConfig {
  a: number;
  b: number;
}

export abstract class AbstractFoo<X extends AbstractFooConfig = AbstractFooConfig> extends BaseConfigurable<X> {
  public static readonly DEFAULT_CONFIG = { a: 1, b: 2 };

  protected readonly log: Logger;

  public constructor(log: Logger, defaults: X, ...config: Overrides<X>) {
    super(defaults, ...config);
    this.log = log;
  }

  public abstract someMethod(): number;
}

// ********************************************************

export interface ConcreteFooConfig extends AbstractFooConfig {
  c: number;
}

export class ConcreteFoo extends AbstractFoo<ConcreteFooConfig> {
  public static readonly DEFAULT_CONFIG: ConcreteFooConfig = BaseConfigurable.mergeOptions(AbstractFoo.DEFAULT_CONFIG, {
    b: 42,
    c: 3
  });

  public constructor(log: Logger, ...config: Overrides<ConcreteFooConfig>) {
    super(log, ConcreteFoo.DEFAULT_CONFIG, ...config);
  }

  public someMethod(): number {
    return this.config.a + this.config.b + this.config.c;
  }
}

// ********************************************************
