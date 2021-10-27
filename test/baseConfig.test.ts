import mock from 'jest-mock-extended';
import type { ILogAdapter } from '@msamblanet/node-slf';
import LibDefault, * as Lib from '../src/index';

test('Check Exports', () => {
  expect(Lib).not.toBeNull();
  expect(Lib.mergeOptions).toBeDefined();
  expect(Lib.BaseConfigurable).toBeDefined();
  expect(Lib.BaseEmittingConfigurable).toBeDefined();
  expect(Lib.BaseLoggingConfigurable).toBeDefined();
  expect(Lib.BaseLoggingEmittingConfigurable).toBeDefined();

  expect(LibDefault).toMatchObject({
    mergeOptions: Lib.mergeOptions,
    BaseConfigurable: Lib.BaseConfigurable,
    BaseEmittingConfigurable: Lib.BaseEmittingConfigurable,
    BaseLoggingConfigurable: Lib.BaseLoggingConfigurable,
    BaseLoggingEmittingConfigurable: Lib.BaseLoggingEmittingConfigurable
  });
});

test('Verify Config arg patterns', () => {
  interface TestConfig extends Lib.IConfig {
    a: number | string | null | { b?: number; c?: number; d?: number };
  }
  type TestConfigOverride = Lib.Override<TestConfig>;

  class X extends Lib.BaseConfigurable<TestConfig> {
    public constructor(...args: TestConfigOverride[]) {
      super(undefined as unknown as TestConfig, ...args);
    }

    public getConfig(): TestConfig {
      return this.config;
    }
  }

  expect(new X(null).getConfig()).toMatchObject({});
  expect(new X(undefined).getConfig()).toMatchObject({});
  expect(new X({}).getConfig()).toMatchObject({});

  expect(new X({ a: 1 }, { a: { b: 2 } }).getConfig()).toMatchObject({ a: { b: 2 } });
  expect(new X({ a: 1 }, { a: 2 }).getConfig()).toMatchObject({ a: 2 });
  expect(new X({ a: 1 }, null, undefined).getConfig()).toMatchObject({ a: 1 });
  expect(new X({ a: 1 }, null, undefined, { a: 2 }).getConfig()).toMatchObject({ a: 2 });
  expect(new X({ a: 1 }, null, undefined, { a: '' }).getConfig()).toMatchObject({ a: '' });
  expect(new X({ a: 1 }, null, undefined, { a: null }).getConfig()).toMatchObject({ a: null });
  expect(new X({ a: 1 }, null, undefined, { a: undefined }).getConfig()).toMatchObject({ a: 1 });

  expect(new X({ a: { b: 1, c: 2 } }).getConfig()).toMatchObject({ a: { b: 1, c: 2 } });
  expect(new X({ a: { b: 1, c: 2 } }, { a: { c: 3, d: 4 } }).getConfig()).toMatchObject({ a: { b: 1, c: 3, d: 4 } });
  expect(new X({ a: { b: 1, c: 2 } }, { a: 9 }).getConfig()).toMatchObject({ a: 9 });
  expect(new X({ a: { b: 1, c: 2 } }, { a: null }).getConfig()).toMatchObject({ a: null });
  expect(new X({ a: { b: 1, c: 2 } }, { a: undefined }).getConfig()).toMatchObject({ a: { b: 1, c: 2 } });
});

test('Touch BaseConfigurable.mergeOptions', () => {
  expect(Lib.BaseConfigurable.mergeOptions<Record<string, number>>({ a: 1, b: 2 }, { b: 3, c: 4 })).toMatchObject({ a: 1, b: 3, c: 4 });
});

test('Touch all variations', () => {
  class TestEmittingConfigurable extends Lib.BaseEmittingConfigurable {
    public constructor() {
      super({});
    }
  }
  class TestLoggingConfigurable extends Lib.BaseLoggingConfigurable {
    public constructor() {
      super(mock.mock<ILogAdapter>(), {});
    }
  }
  class TestLoggingEmittingConfigurable extends Lib.BaseLoggingEmittingConfigurable {
    public constructor() {
      super(mock.mock<ILogAdapter>(), {});
    }
  }

  // Just touch all of these to make sure they are working...
  expect(new TestEmittingConfigurable()).toBeDefined();
  expect(new TestEmittingConfigurable().emit('UNITTEST')).toEqual(false);
  expect(new TestLoggingConfigurable()).toBeDefined();
  expect(new TestLoggingEmittingConfigurable()).toBeDefined();
  expect(new TestLoggingEmittingConfigurable().emit('UNITTEST')).toEqual(false);
});
