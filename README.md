fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## iOS

### ios certificates

```sh
[bundle exec] fastlane ios certificates
```

Fetch certificates and provisioning profiles

### ios release_staging

```sh
[bundle exec] fastlane ios release_staging --env staging
```



### ios release_dist

```sh
[bundle exec] fastlane ios release_dist --env prod
```



----


## Android

### android apk_staging

```sh
[bundle exec] fastlane android apk_staging --env staging
```



### android release_staging

```sh
[bundle exec] fastlane android release_staging --env staging
```



### android apk_dist

```sh
[bundle exec] fastlane android apk_dist --env prod
```



### android release_dist

```sh
[bundle exec] fastlane android release_dist --env prod
```



----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
