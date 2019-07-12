## [0.0.18](https://github.com/rapid-build-ui/rb-popover/compare/v0.0.17...v0.0.18) (2019-07-12)


### Dependencies

* **bump:** dep base v0.0.11



## [0.0.17](https://github.com/rapid-build-ui/rb-popover/compare/v0.0.16...v0.0.17) (2019-07-05)


### Bug Fixes

* **positioning:** bump the z-index to 200 so it appears over nav ([9ced323](https://github.com/rapid-build-ui/rb-popover/commit/9ced323))


### Features

* **onclick:** new api option, execute a function when opening popover via click ([dde7b02](https://github.com/rapid-build-ui/rb-popover/commit/dde7b02))
* **version:** add to component properties accessible via this.version ([42d285f](https://github.com/rapid-build-ui/rb-popover/commit/42d285f))


### Dependencies

* **bump:** deps rb-base v0.0.10 and rb-button v0.0.17 ([6f51363](https://github.com/rapid-build-ui/rb-popover/commit/6f51363))



## [0.0.16](https://github.com/rapid-build-ui/rb-popover/compare/v0.0.15...v0.0.16) (2019-05-09)


### Bug Fixes

* **popover top position:** from being to far from trigger when inside an element with large line-height ([82885d7](https://github.com/rapid-build-ui/rb-popover/commit/82885d7))


### Features

* **new api kind neutral:** create it and make the default kind blue ([9fa3c4a](https://github.com/rapid-build-ui/rb-popover/commit/9fa3c4a))
* **pin option:** display thumbtack icon when popover is open and pinned ([1a503c7](https://github.com/rapid-build-ui/rb-popover/commit/1a503c7))


### Dependencies

* **bump:** deps rb-base v0.0.9 and rb-button v0.0.16 ([40fb429](https://github.com/rapid-build-ui/rb-popover/commit/40fb429))


### BREAKING CHANGES

To migrate the code follow the examples below:

1. **api open option:** change show-popover to open to be consistent with other components ([e2be615](https://github.com/rapid-build-ui/rb-popover/commit/e2be615))

	**Before:**  
	show-popover=true

	**Now:**  
	open=true

2. **api position option:** change default position from right to top ([7575fe0](https://github.com/rapid-build-ui/rb-popover/commit/7575fe0))

	**Before:**  
	nothing to position popover right

	**Now:**  
	position=right (if you want it right)



## [0.0.15](https://github.com/rapid-build-ui/rb-popover/compare/v0.0.14...v0.0.15) (2019-03-05)


### Features

* **icon animation:** add it via upgrading rb-icon to v0.0.13 ([98fc810](https://github.com/rapid-build-ui/rb-popover/commit/98fc810))


### Dependencies

* **bump:** deps rb-base v0.0.8 and rb-button v0.0.15 ([0004c51](https://github.com/rapid-build-ui/rb-popover/commit/0004c51))



## [0.0.14](https://github.com/rapid-build-ui/rb-popover/compare/v0.0.13...v0.0.14) (2019-02-24)


### Features

* **new api option:** icon-valign ([5dcb10f](https://github.com/rapid-build-ui/rb-popover/commit/5dcb10f))
* **new api option pin:** popover only closes by clicking the trigger ([62dcfd0](https://github.com/rapid-build-ui/rb-popover/commit/62dcfd0))
* **responsive:** ensure popover fits in small devices viewport ([2241fcb](https://github.com/rapid-build-ui/rb-popover/commit/2241fcb))
* **styling:** set host to inline-block incase consumer wants to add bumpers ([af5d09f](https://github.com/rapid-build-ui/rb-popover/commit/af5d09f))


### Dependencies

* **bump:** deps rb-base v0.0.7 and rb-button v0.0.14 ([4e521c4](https://github.com/rapid-build-ui/rb-popover/commit/4e521c4))



## [0.0.13](https://github.com/rapid-build-ui/rb-popover/compare/v0.0.12...v0.0.13) (2018-12-05)


### Bug Fixes

* **event:** ensure window click event fires first ([813c36f](https://github.com/rapid-build-ui/rb-popover/commit/813c36f))


### Features

* **bump:** deps rb-base v0.0.6 and rb-button v0.0.13 ([6b37df5](https://github.com/rapid-build-ui/rb-popover/commit/6b37df5))
* **css variables:** add and expose them ([0b827c3](https://github.com/rapid-build-ui/rb-popover/commit/0b827c3))
* **hidden attribute:** display style that respects the hidden attribute ([a0e31f3](https://github.com/rapid-build-ui/rb-popover/commit/a0e31f3))


### Performance Improvements

* **css:** improve browser performance by adding css contain property ([e26a08c](https://github.com/rapid-build-ui/rb-popover/commit/e26a08c))



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


