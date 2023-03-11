### 🙋‍♂️ Made by [@koenbrouwer](https://twitter.com/KoenBrouwer).

---

# Welcome to react-grapple 👋
[![Version](https://img.shields.io/npm/v/react-grapple.svg)](https://www.npmjs.com/package/react-grapple)

A collection of useful hooks that I made. This is a [Node.js](https://nodejs.org/en/) package available through the [npm registry](https://nodejs.org/en/).
Installation into your project is done with the [`npm install` command](https://docs.npmjs.com/downloading-and-installing-packages-locally). 

---

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
