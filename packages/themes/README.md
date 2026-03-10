# @falconix/themes

@falconix/fep 样式覆盖库，提供统一的设计风格和自定义主题变量，方便其他项目引用。

## 特性

- 基于 @falconix/fep 的样式覆盖
- 提供自定义主题变量配置
- 支持 SCSS 预处理器
- 开箱即用的样式覆盖组件
- 轻量级，仅包含必要的样式文件

## 安装

使用 pnpm 安装：

```bash
pnpm add @falconix/themes
```

## 使用方法

### 在 Vue 项目中引入（推荐方式）

在你的主入口文件（如 `main.ts` 或 `main.js`）中引入：

```ts
// 然后正常导入和使用 Element Plus
import ElementPlus from 'element-plus'

import { createApp } from 'vue'
import App from './App.vue'
// 导入样式库
import '@falconix/themes/yc/style.css'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
```

### 直接引用编译后的 CSS 文件

```ts
// 导入我们编译后的主题样式
import '@falconix/themes/yc/style.css'
```

### 直接引用原始 SCSS 文件（推荐用于需要自定义的场景）

从 v1.0.0 开始，我们支持直接引用原始的 SCSS 文件，这样你可以在自己的 SCSS 文件中导入并使用这些变量和样式：

```scss
// 在你的 SCSS 文件中
// 导入自定义变量文件
@import '@falconix/themes/theme-chalk/src/element-vars.scss';

// 你可以在这里覆盖变量
$--border-radius-base: 8px;

// 然后导入样式覆盖文件
@import '@falconix/themes/theme-chalk/src/element-override.scss';
```

在 JavaScript/TypeScript 文件中：

```ts
// 导入 Element Plus 基础样式
import 'element-plus/dist/index.css'

// 直接导入 SCSS 文件
import '@falconix/themes/theme-chalk/src/element-vars.scss'
import '@falconix/themes/theme-chalk/src/element-override.scss'
```
