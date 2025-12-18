# 贡献代码

如何向FCL贡献代码

## 克隆代码

从 [gitlab repo](http://10.168.2.105:8888/soft_group/yingmai/fe_group/fcl) 获取源代码

```shell
git clone http://10.168.2.105:8888/soft_group/yingmai/fe_group/fcl
```

安装依赖

```shell
pnpm i
```

## 初始化项目

在 `packages` 下新建组件目录，也可以拷贝相似组件新建项目

目录名可以与npm包名有差异

### 目录文件说明

- src - 源代码目录

- eslint.config.js - eslint v9 配置文件

- package.json - npm元数据文件

- README.md - 项目文档。生成组件文档时使用

- tsconfig.json - typescript配置文件

- tsdown.config.ts - tsdown配置文件，可选

请参考 [@falconix/configs](/packages/configs/README) 选择相应的配置文件进行配置

### 项目信息

在`package.json`中修改项目基本信息

```json
{
  "name": "@falconix/upload-center",
  "type": "module",
  "version": "0.0.1",
  "description": "falconix upload-center"
}
```

### 命令

在`package.json`中，按照项目情况，添加如下四个命令

```json
{
  "scripts": {
    "dev": "...",
    "build": "...",
    "typecheck": "...",
    "lint": "..."
  }
}
```

## 安装项目依赖

在`FCL根目录`运行命令，添加项目需要的依赖项

```shell
pnpm --filter @falconix/upload-center i ...
```

如果引用的是`FCL`项目内的组件，请使用`工作空间协议`进行引用

```shell
pnpm --filter @falconix/upload-center i @falconix/configs@workspace:^ -D
```

对于项目外的依赖，`FCL项目` 使用`catalog:`管理项目整体依赖版本，请不要手动指定

## 开发

在`FCL根目录`运行`dev`命令，开始开发

```shell
pnpm dev
```

单独运行包内命令

```shell
pnpm --filter @falconix/upload-center lint
// or
pnpm -C packages/uplodaer-center typcheck
```

## 代码规范

git commit message 参考 [约定式提交规范](https://www.conventionalcommits.org/zh-hans/v1.0.0/)

eslint和代码格式化 参考 [@antfu/eslint-config](https://github.com/antfu/eslint-config)，[详情](https://eslint-config.antfu.me/configs)，[详情](https://gitnation.com/contents/eslint-one-for-all-made-easy)

tsconfig 参考 [@vue/tsconfig](https://github.com/vuejs/tsconfig#readme)

版本控制 参考 [语义化版本](https://semver.org/lang/zh-CN/)

## 构建

在`FCL根目录`运行`build`命令，进行构建

```shell
pnpm build
```

## 发布版本

### 生成版本升级文件

确保组件代码修改完成，运行命令：

```shell
pnpm changeset
```

选择需要升级版本的包，添加发版说明

命令完成之后，会在`.changeset`目录下生成升级文件

<ul style="color:red">
  <li>请在git提交当中包含此代码文件，否则构建会失败</li>
  <li>请遵守 <a href="https://semver.org/lang/zh-CN/">语义化版本</a> 的规范升级项目版本</li>
  <li>不要手动修改版本号</li>
  <li>尽量避免不兼容升级，和不符合语义的升级</li>
  <li>升级必须升级版本号，而不能同名覆盖</li>
</ul>

### merge request

在 [merge request](http://10.168.2.105:8888/soft_group/yingmai/fe_group/fcl/-/merge_requests) 中，创建 `merge request`

选择需要合并到`main`的开发分支

`merge request` 创建成功后，流水线开启`lint`、`typecheck` 任务对代码进行检查

通知其他贡献人review代码，通过然后点击 `Merge`

代码合并到`main`分支，并开启`CI 流水线`

### 发布完成

通过 [pipelines](http://10.168.2.105:8888/soft_group/yingmai/fe_group/fcl/-/pipelines) 查看构建状态

成功之后：

- 新版本会推送到私有npm
- 合并 修改的代码 到`main`分支
- 更新文档([FCL docs](http://10.168.2.182:3434/))
