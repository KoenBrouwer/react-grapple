# Changelog

## 2.0.0

### Major Changes

- d3f72ca: Updated dependencies and gave all the hooks a refresh.
- d3f72ca: Removed the useInput and useNumberInput hooks. There's many form libraries out there that do a way better job. :-)

## 1.6.0

- Added `on` and `off` helper functions to `useToggle` hook.

## 1.5.0

- Removed `clear()`, please use `reset()` instead.

## 1.4.0

- Added `useIsMobile` hook for checking the width of the window (using `window.innerWidth`)
- Added `useIsMobileOnce' hook that does the same, but doesn't update when the window resizes.

## 1.3.0

- Added `placeholder` to options and `bind` for `useInput`.
- Added useNumberInput hook for `input[type=number]` with `min`, `max` and `step` options.
- Added test for useToggle hook.
- Added test for useConditionalByTime hook (and actually made some changes because the tests failed 😊)
- Added tests for useInput, useNumberInput, Conditional and testing if all the exports are there.

## 1.2.0

Starting the changelog from now.

- Added `ref`: A ref (using `React.createRef()`) to the input is now accessible through the `ref` property.
