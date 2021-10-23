import extend from "extend";
import type { PartialDeep } from "type-fest";

export type Config = {}; // eslint-disable-line @typescript-eslint/ban-types
export type Override<X> = undefined | null | PartialDeep<X>;
export type Overrides<X> = Array<Override<X>>;
export class BaseConfigurable<X extends Config> {
    public static mergeOptions<X>(defaults: X, ...overrides: Overrides<X>) {
        return extend(true, {}, defaults, ...overrides);
    }

   protected config: X;

    protected constructor(defaults?: X, ...overrides: Overrides<X>) {
        this.config = BaseConfigurable.mergeOptions(defaults, ...overrides);
    }
}
export default BaseConfigurable;
