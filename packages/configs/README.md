# @falconix/configs

falconix 公共配置文件集合

## 安装

```shell
pnpm i @falconix/configs
```

## tsconfig

提供三种tsconfig

- `app`，提供给一般web应用使用

  ```json
  {
    "extends": "@falconix/configs/tsconfig.app.json",
    "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"]
  }
  ```

- `lib`，提供给需要打包发布组件、库使用

  ```json
  {
    "extends": "@falconix/configs/tsconfig.lib.json",
    "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"]
  }
  ```

- `node`，提供给node文件使用，比如`vite.config.ts`

  ```json
  {
    "extends": "@falconix/configs/tsconfig.node.json"
  }
  ```

## eslint config

提供两种配置

- `app`，提供给一般web应用使用

  ```ts
  import config from '@falconix/configs/eslint.config.app.js'

  export default config
  ```

- `lib`，提供给需要打包发布组件、库使用

  ```ts
  import config from '@falconix/configs/eslint.config.lib.js'

  export default config
  ```

基于[@antfu/eslint-config](https://github.com/antfu/eslint-config)

使用前，请安装eslint vscode插件 [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

同时需要配合设置`.vscode/settings.json`

```json
{
  // Disable the default formatter, use eslint instead
  "prettier.enable": false,
  "editor.formatOnSave": false,

  // Auto fix
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },

  // Silent the stylistic rules in your IDE, but still auto fix them
  "eslint.rules.customizations": [
    { "rule": "style/*", "severity": "off", "fixable": true },
    { "rule": "format/*", "severity": "off", "fixable": true },
    { "rule": "*-indent", "severity": "off", "fixable": true },
    { "rule": "*-spacing", "severity": "off", "fixable": true },
    { "rule": "*-spaces", "severity": "off", "fixable": true },
    { "rule": "*-order", "severity": "off", "fixable": true },
    { "rule": "*-dangle", "severity": "off", "fixable": true },
    { "rule": "*-newline", "severity": "off", "fixable": true },
    { "rule": "*quotes", "severity": "off", "fixable": true },
    { "rule": "*semi", "severity": "off", "fixable": true }
  ],

  // Enable eslint for all supported languages
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "jsonc",
    "yaml",
    "toml",
    "xml",
    "gql",
    "graphql",
    "astro",
    "svelte",
    "css",
    "less",
    "scss",
    "pcss",
    "postcss"
  ]
}
```

代码格式化基于`eslint`，请禁止`prettier`相关的插件及功能
