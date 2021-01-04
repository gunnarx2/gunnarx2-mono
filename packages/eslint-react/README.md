# `@gunnarx2/eslint-react`

[![npm version](https://img.shields.io/npm/v/@gunnarx2/eslint-config-eslint-react.svg)](https://www.npmjs.com/package/@gunnarx2/eslint-config-eslint-react)
[![npm downloads](https://img.shields.io/npm/dm/@gunnarx2/eslint-config-eslint-react.svg)](https://www.npmjs.com/package/@gunnarx2/eslint-config-eslint-react)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@gunnarx2/eslint-config-eslint-react)](https://www.npmjs.com/package/@gunnarx2/eslint-config-eslint-react)
[![npm license](https://img.shields.io/npm/l/@gunnarx2/eslint-config-eslint-react)](https://www.npmjs.com/package/@gunnarx2/eslint-config-eslint-react)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

<!-- markdownlint-disable-next-line MD044 -->
Extendable [ESLint](https://eslint.org/) configuration built on top of [eslint-config-react-app](https://www.npmjs.com/package/eslint-config-react-app).

## Installation

```shell
yarn add @gunnarx2/eslint-config-eslint-react \
  @typescript-eslint/eslint-plugin@^4.0.0 \
  @typescript-eslint/parser@^4.0.0 \
  babel-eslint@^10.0.0 \
  eslint@^7.5.0 \
  eslint-config-airbnb@^18.2.0 \
  eslint-config-prettier@^6.14.0 \
  eslint-config-react-app@^6.0.0 \
  eslint-plugin-babel@^5.3.1 \
  eslint-plugin-cypress@^2.11.2 \
  eslint-plugin-flowtype@^5.2.0 \
  eslint-plugin-import@^2.22.0 \
  eslint-plugin-jsx-a11y@^6.3.1 \
  eslint-plugin-prettier@^3.1.4 \
  eslint-plugin-react@^7.21.5 \
  eslint-plugin-react-hooks@^4.2.0 -D
```

### With Create React App

```shell
yarn add @gunnarx2/eslint-config-eslint-react \
  eslint-config-airbnb@^18.2.0 \
  eslint-config-prettier@^6.14.0 \
  eslint-plugin-babel@^5.3.1 \
  eslint-plugin-cypress@^2.11.2 \
  eslint-plugin-prettier@^3.1.4 -D
```

## Usage

<!-- markdownlint-disable-next-line MD044 -->
Extend `@gunnarx2/eslint-react` in the ESLint config. [@gunnarx2/prettier](https://github.com/gunnarx2/gunnarx2-mono/tree/master/packages/prettier)
is included in the package, so make sure to setup the Prettier config and
install its peer dependencies.

```javascript
module.exports = {
  extends: ['@gunnarx2/eslint-react']
};
```
