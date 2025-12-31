import type { ComponentInfo, ComponentResolver, SideEffectsInfo } from 'unplugin-vue-components'
import { getPkgVersion, kebabCase } from './utils'

const FEP_PACKAGE_NAME = '@falconix/fep'

export interface ElementPlusResolverOptions {
  importStyle?: boolean | 'css' | 'sass'
  ssr?: boolean
  version?: string
  directives?: boolean
  exclude?: RegExp
  noStylesComponents?: string[]
}

export type FepResolverOptions = ElementPlusResolverOptions

type ElementPlusResolverOptionsResolved = Required<Omit<ElementPlusResolverOptions, 'exclude'>>
  & Pick<ElementPlusResolverOptions, 'exclude'>

function getSideEffects(dirName: string, options: ElementPlusResolverOptionsResolved): SideEffectsInfo | undefined {
  const { importStyle, ssr } = options
  const themeFolder = `${FEP_PACKAGE_NAME}/theme-chalk`
  const esComponentsFolder = `${FEP_PACKAGE_NAME}/es/components`

  if (importStyle === 'sass') {
    return ssr
      ? [`${themeFolder}/src/base.scss`, `${themeFolder}/src/${dirName}.scss`]
      : [`${esComponentsFolder}/base/style/index`, `${esComponentsFolder}/${dirName}/style/index`]
  } else if (importStyle === true || importStyle === 'css') {
    return ssr
      ? [`${themeFolder}/base.css`, `${themeFolder}/el-${dirName}.css`]
      : [`${esComponentsFolder}/base/style/css`, `${esComponentsFolder}/${dirName}/style/css`]
  }
}

function resolveFclComponent(name: string, _options: ElementPlusResolverOptionsResolved): ComponentInfo | undefined {
  const partialName = kebabCase(name.slice(1))
  return {
    name,
    from: `@falconix/${partialName}`,
    sideEffects: [`${FEP_PACKAGE_NAME}/theme-chalk/base.css`, `@falconix/${partialName}/index.css`],
  }
}

function resolveComponent(name: string, options: ElementPlusResolverOptionsResolved): ComponentInfo | undefined {
  if (options.exclude && name.match(options.exclude)) {
    return
  }
  if (name.match(/^F[A-Z]/)) {
    return resolveFclComponent(name, options)
  }
  if (!name.match(/^El[A-Z]/)) {
    return
  }
  if (name.match(/^ElIcon.+/)) {
    return {
      name: name.replace(/^ElIcon/, ''),
      from: '@falconix/icons-vue',
    }
  }
  const partialName = kebabCase(name.slice(2))
  const { ssr } = options
  return {
    name,
    from: `${FEP_PACKAGE_NAME}/${ssr ? 'lib' : 'es'}`,
    sideEffects: getSideEffects(partialName, options),
  }
}

function resolveDirective(name: string, options: ElementPlusResolverOptionsResolved): ComponentInfo | undefined {
  if (!options.directives) {
    return
  }
  const directives: Record<string, { importName: string, styleName: string }> = {
    Loading: { importName: 'ElLoadingDirective', styleName: 'loading' },
    Popover: { importName: 'ElPopoverDirective', styleName: 'popover' },
    InfiniteScroll: { importName: 'ElInfiniteScroll', styleName: 'infinite-scroll' },
  }
  const directive = directives[name]
  if (!directive) {
    return
  }
  const { ssr } = options
  return {
    name: directive.importName,
    from: `${FEP_PACKAGE_NAME}/${ssr ? 'lib' : 'es'}`,
    sideEffects: getSideEffects(directive.styleName, options),
  }
}

const noStylesComponents = ['ElAutoResizer']
export function ElementPlusResolver(
  options: ElementPlusResolverOptions = {},
): ComponentResolver[] {
  let optionsResolved: ElementPlusResolverOptionsResolved

  async function resolveOptions(): Promise<ElementPlusResolverOptionsResolved> {
    if (optionsResolved) {
      return optionsResolved
    }
    optionsResolved = {
      ssr: false,
      version: await getPkgVersion(FEP_PACKAGE_NAME, '2.2.2'),
      importStyle: 'css',
      directives: true,
      exclude: undefined,
      noStylesComponents: options.noStylesComponents || [],
      ...options,
    }
    return optionsResolved
  }

  return [
    {
      type: 'component',
      resolve: async (name: string) => {
        const options = await resolveOptions()

        if ([...options.noStylesComponents, ...noStylesComponents].includes(name)) {
          return resolveComponent(name, { ...options, importStyle: false })
        } else { return resolveComponent(name, options) }
      },
    },
    {
      type: 'directive',
      resolve: async (name: string) => {
        return resolveDirective(name, await resolveOptions())
      },
    },
  ]
}

export const FepResolver = ElementPlusResolver
