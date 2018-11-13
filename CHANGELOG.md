## [0.0.12](https://github.com/rapid-build-ui/rb-popover/compare/v0.0.11...v0.0.12) (2018-11-13)


### Dependencies

* **bump:** deps rb-base v0.0.5 and rb-button v0.0.12 ([40561f9](https://github.com/rapid-build-ui/rb-popover/commit/40561f9))



## [0.0.11](https://github.com/rapid-build-ui/rb-popover/compare/v0.0.10...v0.0.11) (2018-09-26)


### Dependencies

* **bump:** deps rb-base v0.0.4 and rb-button v0.0.11 ([9122287](https://github.com/rapid-build-ui/rb-popover/commit/9122287))


### BREAKING CHANGES

* **api option:** change icon to icon-kind ([d936ecc](https://github.com/rapid-build-ui/rb-popover/commit/d936ecc))

To migrate the code follow the example below:

**Before:**  
icon="heart"

**Now:**  
icon-kind="heart"



## [0.0.10](https://github.com/rapid-build-ui/rb-popover/compare/v0.0.9...v0.0.10) (2018-09-14)


### Dependencies

* **bump:** deps rb-base v0.0.3 and rb-button v0.0.10 ([d1c8346](https://github.com/rapid-build-ui/rb-popover/commit/d1c8346))



## [0.0.9](https://github.com/rapid-build-ui/rb-popover/compare/v0.0.8...v0.0.9) (2018-09-05)


### Dependencies

* **rb-base:** bump to v0.0.2 ([636d2ad](https://github.com/rapid-build-ui/rb-popover/commit/636d2ad))



## [0.0.8](https://github.com/rapid-build-ui/rb-popover/compare/v0.0.7...v0.0.8) (2018-08-30)


### Dependencies

* **rb-base:** replace deps lit-html and skatejs with @rapid-build-ui/rb-base and make corresponding updates ([d5ec78e](https://github.com/rapid-build-ui/rb-popover/commit/d5ec78e))



## [0.0.7](https://github.com/rapid-build-ui/rb-popover/compare/v0.0.6...v0.0.7) (2018-07-18)


This release includes a massive refactoring of rb-popover for the following features and fixes:  
Also included is a bump of rb-button to [v0.0.7](https://git.io/fNZJu) which is required for the new popover positioning.  
Unfortunately all the following are from [this single commit](https://github.com/rapid-build-ui/rb-popover/commit/4d47f6e).


### Features

* **new api option "icon-size":** for changing the size of the icon
* **improve visibility:** ensure popover is always visible in viewport
* **standalone caption support:** accurately style popover when using caption and no content option


### Bug Fixes

* **firefox:** from not setting the correct popover width
* **popover position:** when used inside text with a large font-size



## [0.0.6](https://github.com/rapid-build-ui/rb-popover/compare/v0.0.5...v0.0.6) (2018-07-11)


### Bug Fixes

* **mobile:** not closing the popover on clickaway ([2cd546a](https://github.com/rapid-build-ui/rb-popover/commit/2cd546a))



## [0.0.5](https://github.com/rapid-build-ui/rb-popover/compare/v0.0.4...v0.0.5) (2018-07-08)


Release switches web components library Polymer 3 to [SkateJS](http://skatejs.netlify.com/) and view renderer [lit-html](https://polymer.github.io/lit-html/).


### Bug Fixes

* **safari and firefox:** closing the popover on window click ([1ac7e67](https://github.com/rapid-build-ui/rb-popover/commit/1ac7e67))



## 0.0.4 (2018-06-22)


### Bug Fixes

* **positioning:** adjust to window viewPort ([075414d](https://github.com/rapid-build-ui/rb-popover/commit/075414d))
* **positioning:** fix top, bottom and left ([4b28d9c](https://github.com/rapid-build-ui/rb-popover/commit/4b28d9c))
* **spacing:** ensure hidden popover content doesn't occupy any space ([f7d5fab](https://github.com/rapid-build-ui/rb-popover/commit/f7d5fab))


### Features

* **bump:** dep [@rapid-build-ui](https://github.com/rapid-build-ui)/rb-button to v0.0.4 ([5c0b5c3](https://github.com/rapid-build-ui/rb-popover/commit/5c0b5c3))


