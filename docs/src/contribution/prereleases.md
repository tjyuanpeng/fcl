# 预发布版本

如何发布预发布版本

## changesets 文档

请先参考 `changesets` 对于发布版本的说明文档
[https://github.com/changesets/changesets/blob/main/docs/prereleases.md](https://github.com/changesets/changesets/blob/main/docs/prereleases.md)

## 条件限制

为了防止预发布版本滥用，造成版本不可控

所以对预发布版本做了严格的限制

必须满足如下要求

- 只有在 merge request 中才能构建

- 源分支，分支名必须为 `pre/` 开头

- 目标合并分支，分支名必须为 `main` 分支

- 执行过 `pnpm changeset pre enter beta`

- 只有 `changeset` 退出预发布模式，merge request 才能合并分支

## 开发

准备好你待发布的分支，比如：`pre/test`

运行命令，进入预发布模式

```shell
pnpm changeset pre enter beta
```

运行 `changeset` 命令确定预发布版本

```shell
pnpm changeset
```

按照命令行生成 `changgeset` 相关文件

提交相关代码到git

创建 `merge request`，`源分支`选择对应的分支，`目标分支`选择 `main`

等待 pipeline 前置任务执行，执行完之后，手动触发预发布任务 ———— `pre-pkgs-publish`

![](/pre-releases-pic-1.jpg)

构建成功，预发布版本会发布到 npm 仓库

## 退出预发布

调试完成之后，请退出预发布模式，让 merge request 能继续进行，代码 merge `main` 分支

运行命令：

```shell
pnpm changeset pre exit
```

运行 `changeset` 命令确定正式发布版本

```shell
pnpm changeset
```

提交代码到git，在原来的 `merge request` 等待所有的 `pipeline` 全部执行成功，就可以继续进行后续操作
