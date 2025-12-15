# fcl

falconix component library

## package manager

use `pnpm` to manage packages

## install dependencies

```shell
pnpm i
```

## create tsdown project

```shell
pnpm create tsdown@latest
```

## create vite project

```shell
pnpm create vite@latest
```

## develop

```shell
pnpm dev
```

## lint & typescheck

```shell
pnpm lint
pnpm typescheck
```

## build

```shell
pnpm build
```

## update version

before publish, you should run the following command

```shell
pnpm changeset
```

after running the command, changeset will create a markdown file to determine how to update versions

## publish

[create a merge request](http://10.168.2.105:8888/soft_group/yingmai/fe_group/fcl/-/merge_requests/new)

create a merge request merging into main branch in the gitlab

then gitlab pipeline will publish repos to the private npm registry
