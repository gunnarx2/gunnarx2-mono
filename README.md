# `@gunnarx2`

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

## Packages

- [@gunnarx2/hooks](https://github.com/gunnarx2/gunnarx2-mono/tree/master/packages/hooks)
- [@gunnarx2/utils](https://github.com/gunnarx2/gunnarx2-mono/tree/master/packages/utils)
<!-- markdownlint-disable-next-line MD044 -->
- [@gunnarx2/eslint-react](https://github.com/gunnarx2/gunnarx2-mono/tree/master/packages/eslint-react)
- [@gunnarx2/markdownlint](https://github.com/gunnarx2/gunnarx2-mono/tree/master/packages/markdownlint)
<!-- markdownlint-disable-next-line MD044 -->
- [@gunnarx2/prettier](https://github.com/gunnarx2/gunnarx2-mono/tree/master/packages/prettier)
- [@gunnarx2/stylelint](https://github.com/gunnarx2/gunnarx2-mono/tree/master/packages/stylelint)

## Usage

Recommended node version is defined in `.nvmrc`.

**Setup everything** - `yarn root:setup`  
Will setup required files and directories for everything to work. It's important
to build packages and run TypeScript, because when local packages are symlinked
they will refer to its `lib` directory.

**Create package** - `yarn root:create`  
Create a new package. Will run the `scripts/create/index.js` script.

**Install root dependencies** - `yarn root:install`  
Install root dependencies.

**Install root dependencies - Continuous integration** -
`yarn root:install:ci`  
Install root dependencies with [--frozen-lockfile](https://classic.yarnpkg.com/en/docs/cli/install/#toc-yarn-install-frozen-lockfile)
and [--ignore-engines](https://classic.yarnpkg.com/en/docs/cli/install/#toc-yarn-install-ignore-engines)
so it works well during continuous integration.

**Publish** - `yarn lerna:publish`  
[Publish](https://github.com/lerna/lerna/tree/main/commands/publish) packages in
the current project. This script is executed by GitHub actions.

**Add dependencies to packages** -
`yarn lerna:add <package>[@version] [--dev] [--exact] [--peer]`  
[Add](https://github.com/lerna/lerna/tree/main/commands/add) package as dependency
to packages in the current project. Note that only a single package can be added
at a time.

**Clean everything** - `yarn lerna:clean`  
[Clean](https://github.com/lerna/lerna/tree/main/commands/clean) up `node_modules`
and `lib` in the entire repository.

**Version pre** - `yarn lerna:version:pre`  
Run required scripts before the opportunity to set a new version is available.

**Version patch** - `yarn lerna:version:patch`  
Bump patch (x.x.1) version of packages changed since the last release.

**Version minor** - `yarn lerna:version:minor`  
Bump minor (x.1.x) version of packages changed since the last release.

**Version major** - `yarn lerna:version:major`  
Bump major (1.x.x) version of packages changed since the last release.

**Install packages dependencies** - `yarn lerna:bootstrap`  
[Link](https://github.com/lerna/lerna/tree/main/commands/bootstrap) local packages
together and install remaining package dependencies.

**Install packages dependencies - Continuous integration** -
`yarn lerna:bootstrap:ci`  
[Link](https://github.com/lerna/lerna/tree/main/commands/bootstrap) local packages
together and install remaining package dependencies. Executed with [--frozen-lockfile](https://classic.yarnpkg.com/en/docs/cli/install/#toc-yarn-install-frozen-lockfile)
and [--ignore-engines](https://classic.yarnpkg.com/en/docs/cli/install/#toc-yarn-install-ignore-engines)
so it works well during continuous integration.

**Test - Continuous integration** - `yarn lerna:run:test:ci`  
Run tests within each package for continuous integration.

**Test - Watch** - `yarn lerna:run:test:watch`  
Watch tests for each package.

**TypeScript** - `yarn lerna:run:typescript`  
Report any TypeScript issues and generate types within all packages.

**Build packages** - `yarn lerna:run:build`  
Build all packages.

**Prettier report** - `yarn prettier:report`  
Report any [Prettier](https://prettier.io/) issues.

**Prettier fix** - `yarn prettier:fix`  
Fix any [Prettier](https://prettier.io/) issues.

**ESLint report** - `yarn eslint:report`  
Report any [ESLint](https://eslint.org/) issues.

**ESLint fix** - `yarn eslint:fix`  
Fix any [ESLint](https://eslint.org/) issues.

## Lerna

Using [Lerna](https://github.com/lerna/lerna) to manage scoped packages. Lerna is
a tool for managing JavaScript projects with multiple packages.

## GitHub actions

Within `.github/workflow` exists the automated workflow with [GitHub Actions](https://github.com/features/actions).

## Browser support

Built on top of [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env).
It uses [useBuiltIns: 'usage'](https://babeljs.io/docs/en/babel-preset-env#usebuiltins-usage)
and the supported browsers are defined in `.browserslistrc`.
