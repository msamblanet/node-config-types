# Node Config Types
[![npm version](https://badge.fury.io/js/@msamblanet%2Fnode-config-types.svg)](https://badge.fury.io/js/@msamblanet%2Fnode-config-types)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

This repository is part of a collection of my personal node.js libraries and templates.  I am making them available to the public - feel free to offer suggestions, report issues, or make PRs via GitHub.

This project provides a minimal implementation of types and base classes for configurable components to allow for consistent usages across projects.

The sample below is provided in ```example-module.ts``` for use as a template for new components (if desired).

```typescript
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
```
