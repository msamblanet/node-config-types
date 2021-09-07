import extend from "extend";

export type AllOptional<T> = {
    [P in keyof T]?: T[P];
};
export type RecursiveAllOptional<T> = {
    [P in keyof T]?: RecursiveAllOptional<T[P]>;
};

export type Config = Record<string | number | symbol, unknown>
export type Override<X> = unknown // eslint-disable-line @typescript-eslint/no-unused-vars
export class BaseConfigurable<X extends Config> {
    protected config: X;

    protected constructor(defaultConfig?: X, ...overrides: Override<X>[]) {
        this.config = extend(true, {}, defaultConfig, ...overrides);
    }
}
export default BaseConfigurable;
