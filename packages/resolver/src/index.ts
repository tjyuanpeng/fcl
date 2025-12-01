// @fep
import type { ComponentInfo, ComponentResolver, SideEffectsInfo } from 'unplugin-vue-components'
// @fep
// import { compare } from 'compare-versions'
import { getPkgVersion, kebabCase } from './utils'

// @fep
const PACKAGE_NAME = '@falconix/fep'

export interface ElementPlusResolverOptions {
  /**
   * import style css or sass with components
   *
   * @default 'css'
   */
  importStyle?: boolean | 'css' | 'sass'

  /**
   * use commonjs lib & source css or scss for ssr
   */
  ssr?: boolean

  /**
   * specify element-plus version to load style
   *
   * @default installed version
   */
  version?: string

  /**
   * auto import for directives
   *
   * @default true
   */
  directives?: boolean

  /**
   * exclude component name, if match do not resolve the name
   */
  exclude?: RegExp

  /**
   * a list of component names that have no styles, so resolving their styles file should be prevented
   */
  noStylesComponents?: string[]

  /**
   * nightly version
   */
  nightly?: boolean
}

// @fep
export type FepResolverOptions = ElementPlusResolverOptions

type ElementPlusResolverOptionsResolved = Required<Omit<ElementPlusResolverOptions, 'exclude'>>
  & Pick<ElementPlusResolverOptions, 'exclude'>

// @fep
// /**
//  * @deprecated
//  * @param partialName
//  * @param options
//  */
// function getSideEffectsLegacy(
//   partialName: string,
//   options: ElementPlusResolverOptionsResolved,
// ): SideEffectsInfo | undefined {
//   const { importStyle } = options
//   if (!importStyle)
//     return

//   if (importStyle === 'sass') {
//     return [
//       'element-plus/packages/theme-chalk/src/base.scss',
//       `element-plus/packages/theme-chalk/src/${partialName}.scss`,
//     ]
//   }
//   else if (importStyle === true || importStyle === 'css') {
//     return [
//       'element-plus/lib/theme-chalk/base.css',
//       `element-plus/lib/theme-chalk/el-${partialName}.css`,
//     ]
//   }
// }

function getSideEffects(dirName: string, options: ElementPlusResolverOptionsResolved): SideEffectsInfo | undefined {
  const { importStyle, ssr, nightly } = options
  // @fep
  // const themeFolder = nightly ? '@element-plus/nightly/theme-chalk' : 'element-plus/theme-chalk'
  const themeFolder = nightly ? '@element-plus/nightly/theme-chalk' : `${PACKAGE_NAME}/theme-chalk`
  // @fep
  // const esComponentsFolder = nightly ? '@element-plus/nightly/es/components' : 'element-plus/es/components'
  const esComponentsFolder = nightly ? '@element-plus/nightly/es/components' : `${PACKAGE_NAME}/es/components`

  if (importStyle === 'sass') {
    return ssr
      ? [`${themeFolder}/src/base.scss`, `${themeFolder}/src/${dirName}.scss`]
      : [`${esComponentsFolder}/base/style/index`, `${esComponentsFolder}/${dirName}/style/index`]
  }
  else if (importStyle === true || importStyle === 'css') {
    return ssr
      ? [`${themeFolder}/base.css`, `${themeFolder}/el-${dirName}.css`]
      : [`${esComponentsFolder}/base/style/css`, `${esComponentsFolder}/${dirName}/style/css`]
  }
}

function resolveComponent(name: string, options: ElementPlusResolverOptionsResolved): ComponentInfo | undefined {
  if (options.exclude && name.match(options.exclude))
    return

  if (!name.match(/^El[A-Z]/))
    return

  if (name.match(/^ElIcon.+/)) {
    return {
      name: name.replace(/^ElIcon/, ''),
      from: '@element-plus/icons-vue',
    }
  }

  const partialName = kebabCase(name.slice(2))// ElTableColumn -> table-column
  // @fep
  // const { version, ssr, nightly } = options
  const { ssr, nightly } = options

  // @fep
  // >=1.1.0-beta.1
  // if (compare(version, '1.1.0-beta.1', '>=') || nightly) {
  return {
    name,
    // @fep
    // from: `${nightly ? '@element-plus/nightly' : 'element-plus'}/${ssr ? 'lib' : 'es'}`,
    from: `${nightly ? '@element-plus/nightly' : PACKAGE_NAME}/${ssr ? 'lib' : 'es'}`,
    sideEffects: getSideEffects(partialName, options),
  }
  // @fep
  // }
  // // >=1.0.2-beta.28
  // else if (compare(version, '1.0.2-beta.28', '>=')) {
  //   return {
  //     from: `element-plus/es/el-${partialName}`,
  //     sideEffects: getSideEffectsLegacy(partialName, options),
  //   }
  // }
  // // for <=1.0.1
  // else {
  //   return {
  //     from: `element-plus/lib/el-${partialName}`,
  //     sideEffects: getSideEffectsLegacy(partialName, options),
  //   }
  // }
}

function resolveDirective(name: string, options: ElementPlusResolverOptionsResolved): ComponentInfo | undefined {
  if (!options.directives)
    return

  const directives: Record<string, { importName: string, styleName: string }> = {
    Loading: { importName: 'ElLoadingDirective', styleName: 'loading' },
    Popover: { importName: 'ElPopoverDirective', styleName: 'popover' },
    InfiniteScroll: { importName: 'ElInfiniteScroll', styleName: 'infinite-scroll' },
  }

  const directive = directives[name]
  if (!directive)
    return

  // @fep
  // const { version, ssr, nightly } = options
  const { ssr, nightly } = options

  // @fep
  // >=1.1.0-beta.1
  // if (compare(version, '1.1.0-beta.1', '>=') || nightly) {
  return {
    name: directive.importName,
    from: `${nightly ? '@element-plus/nightly' : PACKAGE_NAME}/${ssr ? 'lib' : 'es'}`,
    sideEffects: getSideEffects(directive.styleName, options),
  }
  // @fep
  // }
}

const noStylesComponents = ['ElAutoResizer']

/**
 * Resolver for Element Plus
 *
 * See https://github.com/antfu/vite-plugin-components/pull/28 for more details
 * See https://github.com/antfu/vite-plugin-components/issues/117 for more details
 *
 * @author @develar @nabaonan @sxzz
 * @link https://element-plus.org/ for element-plus
 *
 */
export function ElementPlusResolver(
  options: ElementPlusResolverOptions = {},
): ComponentResolver[] {
  let optionsResolved: ElementPlusResolverOptionsResolved

  async function resolveOptions(): Promise<ElementPlusResolverOptionsResolved> {
    if (optionsResolved)
      return optionsResolved
    optionsResolved = {
      ssr: false,
      // @fep
      // version: await getPkgVersion('element-plus', '2.2.2'),
      version: await getPkgVersion(PACKAGE_NAME, '2.2.2'),
      importStyle: 'css',
      directives: true,
      exclude: undefined,
      noStylesComponents: options.noStylesComponents || [],
      nightly: false,
      ...options,
    }
    return optionsResolved
  }

  return [
    {
      type: 'component',
      resolve: async (name: string) => {
        const options = await resolveOptions()

        if ([...options.noStylesComponents, ...noStylesComponents].includes(name))
          return resolveComponent(name, { ...options, importStyle: false })
        else return resolveComponent(name, options)
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

// @fep
export const FepResolver = ElementPlusResolver
