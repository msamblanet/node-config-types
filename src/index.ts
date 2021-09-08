import extend from "extend";
import type { DeepPartial } from "tsdef";

export type Config = {}
export type Override<X> = undefined | null | DeepPartial<X>;
export class BaseConfigurable<X extends Config> {
    protected config: X;

    protected constructor(defaultConfig?: X, ...overrides: Override<X>[]) {
        this.config = extend(true, {}, defaultConfig, ...overrides);
    }
}
export default BaseConfigurable;
