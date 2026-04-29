# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Falconix Component Library (fcl) - a Vue 3 component library monorepo managed with pnpm workspaces and Turborepo.

## Package Manager

**Only use pnpm** - enforced by preinstall hook. Node >=20, pnpm >=10 required.

## Monorepo Structure

- `packages/*` - Component packages (@falconix/use-ajax, @falconix/micro-app, @falconix/split-panel, @falconix/icons-vue, @falconix/steps2, etc.)
- `play/` - Local development environment for debugging components
- `docs/` - VitePress documentation site
- `fep/` - Local fep package override (see pnpm.overrides in package.json)

## Build System

Uses **Turborepo** for task orchestration and **tsdown** for building individual packages.

### Critical Build Dependencies

Per turbo.json, these packages must build before dev/play can run:

- `@falconix/fep-resolver`
- `@falconix/icons-vue`

If you encounter import errors during dev, ensure these packages are built first.

## Common Commands

```bash
# Install dependencies
pnpm i

# Development (runs all package dev tasks)
pnpm dev

# Component debugging (runs play workspace only)
pnpm play

# Build all packages
pnpm build

# Linting and type checking
pnpm lint
pnpm typecheck

# Clean all build artifacts and node_modules
pnpm clean
```

## Working with Individual Packages

```bash
# Build a specific package
turbo build --filter=@falconix/use-ajax

# Dev mode for a specific package
turbo dev --filter=@falconix/split-panel

# Run typecheck on a specific package
turbo typecheck --filter=@falconix/micro-app
```

## Dependency Management

Uses **pnpm catalog mode** (strict) - all shared dependency versions are defined in `pnpm-workspace.yaml` under the `catalog:` section. When adding dependencies to packages, reference them as `"dependency-name": "catalog:"` in package.json.

## Versioning and Publishing

1. Make changes and commit
2. Run `pnpm changeset` to create a changeset file describing the changes
3. Create a merge request to main branch in GitLab
4. GitLab CI/CD pipeline automatically publishes to private npm registry and pushes version tags

**Do not manually update version numbers** - changesets handles this automatically.

## Package Structure

Most packages follow this pattern:

- Built with tsdown
- Peer dependencies: Vue 3, often @falconix/fep
- Export ESM modules from `dist/`
- Some packages (split-panel, steps2) also export CSS

## Play Workspace

Use `pnpm play` to run a Vite-based development environment for testing components in isolation. This is the recommended way to debug components during development.
