# `@gunnarx2/stylelint`

[![npm version](https://img.shields.io/npm/v/@gunnarx2/stylelint.svg)](https://www.npmjs.com/package/@gunnarx2/stylelint)
[![npm downloads](https://img.shields.io/npm/dm/@gunnarx2/stylelint.svg)](https://www.npmjs.com/package/@gunnarx2/stylelint)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@gunnarx2/stylelint)](https://www.npmjs.com/package/@gunnarx2/stylelint)
[![npm license](https://img.shields.io/npm/l/@gunnarx2/stylelint)](https://www.npmjs.com/package/@gunnarx2/stylelint)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

Extendable [Stylelint](https://stylelint.io/) configuration.

## Installation

```shell
yarn add @gunnarx2/stylelint stylelint@^13.7.2 stylelint-config-sass-guidelines@^7.1.0 -D
```

## Usage

Extend `@gunnarx2/stylelint` in the Stylelint config.

```javascript
module.exports = {
  extends: '@gunnarx2/stylelint'
};
```
