# Node Config Types
[![npm version](https://badge.fury.io/js/@msamblanet%2Fnode-config-types.svg)](https://badge.fury.io/js/@msamblanet%2Fnode-config-types)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

This repository is part of a collection of my personal node.js libraries and templates.  I am making them available to the public - feel free to offer suggestions, report issues, or make PRs via GitHub.

This project provides a minimal implementation of types and base classes for configurable components to allow for consistent usages across projects.

The sample below is provided in ```example-module.ts``` for use as a template for new components (if desired).

Variations of ```BaseConfigurable``` are provided to account for logging classes and event emitters.  The full list of base clases are:

- ```BaseConfigurable<C>```
- ```BaseEmittingConfigurable<C>``` - Subclasses ```EventEmitter```
- ```BaseLoggingConfigurable<C,L>``` - Exposes ```log``` in a protected member
- ```BaseLoggingEmittingConfigurable<C,L>``` - Exposes ```log``` in a protected member, subclasses ```EventEmitter```
- In all of the above:
  - ```C``` is the type of the config and defaults to ```IConfig```
  - ```L``` is the type of the logger and it defaults to ```ILogAdapter``` from ```@msamblanet/slf4j``` (but can be anything)

```typescript
import { IConfig, Overrides, mergeOptions, BaseLoggingConfigurable } from '@msamblanet/node-config-types';

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
```
