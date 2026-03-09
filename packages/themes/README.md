# @yc/themes

Element Plus UI 样式覆盖库，提供统一的设计风格和自定义主题变量，方便其他项目引用。

## 特性

- 基于 Element Plus UI 的样式覆盖
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
// 导入 Element Plus 基础样式
import 'element-plus/dist/index.css'

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

## 自定义主题

如果你想进一步自定义主题，可以基于我们的变量文件创建自己的样式：

1. 创建你自己的变量文件，例如 `my-vars.scss`
2. 导入我们的变量文件并覆盖你需要修改的变量
3. 导入 Element Plus 和我们的样式文件

```scss
// my-vars.scss
@import '@falconix/themes/theme-chalk/src/element-vars.scss';

// 覆盖主题颜色
$--colors: (
  'primary': (
    'base': #646cff,
    // 你的自定义主色
  ), // 其他颜色保持不变，会从导入的变量文件继承
);
```

然后在你的项目中使用：

```ts
import 'element-plus/dist/index.css'
import './my-vars.scss'
import '@falconix/themes/theme-chalk/src/element-override.scss'
```

## 样式覆盖的组件

目前支持样式覆盖的组件包括：

- Button（按钮）
- Tag（标签）
- Tabs（标签页）
- Table（表格）
- Pagination（分页）
- Popover（弹出框）
- Dialog（对话框）
- Input（输入框）
- Select（选择器）
- Form（表单）
- Card（卡片）
- Avatar（头像）
- Dropdown（下拉菜单）

## 工具类

我们提供了一些常用的工具类：

- `.yc-text-primary` - 主色文本
- `.yc-text-secondary` - 次要文本颜色
- `.yc-mt-1`, `.yc-mb-1` - 间距工具类 (8px)
- `.yc-mt-2`, `.yc-mb-2` - 间距工具类 (16px)
