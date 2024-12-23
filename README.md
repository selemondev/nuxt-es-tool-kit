<p align="center">
 <img align="center" src="https://raw.githubusercontent.com/selemondev/nuxt-es-tool-kit/master/assets/nuxt-es-tool-kit.png" />
 <h1 align="center">
 Nuxt Es-Tool-Kit
 </h1>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@selemondev/nuxt-es-tool-kit">
    <img alt="npm-version-src" src="https://img.shields.io/npm/v/@selemondev/nuxt-es-tool-kit/latest.svg?style=flat&colorA=020420&colorB=00DC82" />
  </a>
  <a href="https://npmjs.com/package/@selemondev/nuxt-es-tool-kit">
    <img alt="npm-downloads-src" src="https://img.shields.io/npm/dm/@selemondev/nuxt-es-tool-kit.svg?style=flat&colorA=020420&colorB=00DC82" />
  </a>
  <a href="https://nuxt.com">
    <img alt="nuxt-src" src="https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js" />
  </a>
</p>

## Demo

### Play with it on [Stackblitz](https://stackblitz.com/edit/nuxt-starter-oexse8ae?file=app.vue)

## Quick Setup

1. Install the module in your Nuxt application with one command:

```bash
npx nuxi@latest module add @selemondev/nuxt-es-tool-kit
```

That's it! You can now use the `@selemondev/nuxt-es-tool-kit` module in your Nuxt application ✨.

## Configuration

The `@selemondev/nuxt-es-tool-kit` module allows you to add prefixes, aliases and utilities.

All the modules are supported except the `compat` module as it clashes with the other modules. The so called `compat` module has APIs that are supported natively by JavaScript.

Below is how you can configure and use them in your Nuxt 3 project:

```ts
export default defineNuxtConfig({
  modules: ['@selemondev/nuxt-es-tool-kit'],
  devtools: { enabled: true },
  esToolkit: {
    prefix: 'use',
    alias: [],
    utilities: ['promise', 'math', 'predicate', 'string', 'util', 'object', 'function', 'array'],
  },
})

```

When using the `head` utility, you might encounter a warning in your console that states: `Duplicated imports "useHead", the one from "@unhead/vue" has been ignored and es-toolkit-array is used`. This warning occurs because `@selemondev/nuxt-es-tool-kit` array module exports a utility known as `head` and when used together with the `use` prefix it clashes with the `useHead` utility provided by `@unhead/vue`.

To resolve this issue you can do either of the following:

1. Configure an alias for the `head` utility as shown below:

```ts
  esToolkit: {
    ...
    ...
    alias: [
      ['head', 'headArr'],
    ],
},
```

2. Use a different prefix other than `use`.

then in your component:

### Example 1 with `alias` + `prefix` + `utilities`:

```ts
esToolkit: {
    prefix: 'use',
    utilities: ['array'],
    alias: [
      ['flatten', 'flattenArr'],
      ['head', 'headArr'],
    ],
},
```

```vue
<script setup lang="ts">
const array = [1, [2, 3], [4, [5, 6]]]
const result = useFlattenArr(array, 2)
</script>

<template>
  <div>
    {{ result }}
  </div>
</template>
```


### Example 2 with `prefix` + `utilities` only:

```ts
export default defineNuxtConfig({
  modules: ['@selemondev/nuxt-es-tool-kit'],
  devtools: { enabled: true },
  esToolkit: {
    prefix: 'use',
    utilities: ['string'],
  },
})

```

then in your component:

```vue
<script setup lang="ts">
const result = useKebabCase('some whitespace')
</script>

<template>
  <div>
    {{ result }}
  </div>
</template>
```


### Example 3 with `utilities` only:

```ts
export default defineNuxtConfig({
  modules: ['@selemondev/nuxt-es-tool-kit'],
  devtools: { enabled: true },
  esToolkit: {
    utilities: ['predicate'],
  },
})

```

```vue
<script setup lang="ts">
const result = /abc/
</script>

<template>
  <div>
    {{ isRegExp(result) }}
  </div>
</template>
```

## Types

Below are the types of the `esToolkit` config:

| Prop               | Type    | Description                                              | Default   |
| ------------------ | ------- | -------------------------------------------------------- | --------- |
| prefix             | string  | Keyword placed infront of the utilities and helpers.                            | ''        |
| alias       | [string, string][]     | A unique name assigned to a utility to avoid naming conflicts with other third-party packages and libraries.                                       | []        |
| utilities         | Utilities[]   | The utilities supported by `es-toolkit`              | []


## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>


Happy hacking ✨.