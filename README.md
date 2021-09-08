# Node Config Types
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

This repository is part of a collection of my personal node.js libraries and templates.  I am making them available to the public - feel free to offer suggestions, report issues, or make PRs via GitHub.

This project provides a minimal implementation of types and base classes for configurable components to allow for consistent usages across projects.

The sample below is provided in ```example-module.ts``` for use as a template for new components (if desired).

```typescript
import type { Logger } from "tslog";
import { Config, Override, BaseConfigurable } from "@msamblanet/node-config-types";

export interface FooConfig extends Config {
    a: number
    b: number
}
export type FooConfigOverride = Override<FooConfig>

export class Foo extends BaseConfigurable<FooConfig> {
    public static readonly DEFAULT_CONFIG = { a: 1, b: 2 }

    protected readonly log: Logger;

    public constructor(log: Logger, ...config: FooConfigOverride[]) {
        super(Foo.DEFAULT_CONFIG, ...config);
        this.log = log;
    }

    public someMethod(): number {
        return this.config.a + this.config.b;
    }
}
```
