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
