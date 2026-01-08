# @falconix/fep-resolver

@falconix/fep 自动导入插件

## 安装

```shell
pnpm i @falconix/fep-resolver
```

## 配置

```typescript
// vite.config.ts
import { FepResolver } from '@falconix/fep-resolver'
import vue from '@vitejs/plugin-vue'

export default defineConfig(() => {
  const env = checkAndLoadEnv()
  return {
    plugins: [
      AutoImport({
        resolvers: [FepResolver()],
      }),
      Components({
        resolvers: [FepResolver()],
      }),
      vue(),
    ],
  }
})
```

## 注意事项

使用`@falconix/fep-resolver`之后，`@falconix/fep`会按需导入，所以不需要再完整导入fep

## fcl自动导入

支持 `fcl组件` 的自动导入

符合以下要求的 `fcl组件` ，支持自动导入

- npm包名以 `@falconix` 开头的组件

- 组件名称以 `F` 开头，后面的组件名称首字母大写(/^F[A-Z]/)，例如：`FSplitPanel`

- 组件的样式文件放到根目录并命名为：`index.css`。例：`@falconix/xxx/index.css`

如果组件不符合自动导入要求，请配置 `exclude` 属性用来排除组件

```typescript
FepResolver({
  exclude: '@falconix/xxx'
})
```
