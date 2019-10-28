## A Note about the AboutModuleComponent

!! The AboutModuleComponent is currently (Aug. 10, 2017) used as a dummy component to simply redirect to the first child View within a Module.

Since the relationship between Modules and Views is configurable (i.e.: dynamic) we can't leverage the 'redirectTo' facilities of Angular (because we don't know at compile-time what children a Module contains). Thus, the AboutModuleComponent retrieves the current active Module, finds the first View it contains, and redirects.

In the future, this Component could be used to actually display useful info about the active Module (hence the name AboutModuleComponent).