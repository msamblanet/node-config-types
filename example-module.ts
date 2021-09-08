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
