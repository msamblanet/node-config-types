# Node Config Types - Revision History

- 2021-10-27: v0.4.0
  - Change readme.md example to use proper import
  - Move mergeOptions into stand-alone method
  - Deprecate BaseConfigurable.mergeOptions
  - Add BaseEmittingConfigurable, BaseLoggingConfigurable, BaseLoggingEmittingConfigurable
  - Removed hard requirement to extend IConfig
  - Added default for type of config (IConfig) and the logger (ILogAdpater from @msamblanet/node-slf)

- 2021-10-26: v0.3.2
  - Updated example in readme
  - Added badge to readme
  - Version bumps

- 2021-10-23: v0.3.1 - BREAKING
  - Expanded example, added template module
  - Added mergeOptions
  - Migrated to @msamblanet/node-project-template
  - Enhanced examples
  - BREAKING: Change Config -> IConfig
  - BREAKING: Made BaseConfigurable abstract
  - BREAKING: Made defaults constructor parameter required

- 2021-09-08: Initial Release
