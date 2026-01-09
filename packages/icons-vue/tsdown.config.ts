import type { UserConfig } from 'tsdown'
import path from 'node:path'
import process from 'node:process'
import * as epiv from '@element-plus/icons-vue'
import fs from 'fs-extra'
import { defineConfig } from 'tsdown'
import Vue from 'unplugin-vue/rolldown'

const toPascalCase = (str: string) => str.replace(/(^|-)\w/g, match => match.toUpperCase().replace('-', ''))

const getCustomIconMaps = (root: string, prefixes: string[]) => {
  return fs.readdirSync(root, { encoding: 'utf8', recursive: true })
    .reduce((acc, filepath) => {
      for (const prefix of prefixes) {
        const matches = filepath.match(`^${prefix}/(.+).vue$`)
        if (matches) {
          acc[prefix] ??= new Map()
          acc[prefix].set(toPascalCase(matches[1]), filepath)
        }
      }
      return acc
    }, {} as Record<string, Map<string, string>>)
}

const buildIndex = async () => {
  const root = path.resolve(process.cwd(), './src')
  const { customs, overrides } = getCustomIconMaps(root, ['customs', 'overrides'])
  const epivKeys = Object.keys(epiv)
  for (const [key, value] of customs) {
    if (epivKeys.includes(key)) {
      throw new Error(`Custom icon error (${value}): Key "${key}" is already used by @element-plus/icons-vue.`)
    }
  }
  for (const [key, value] of overrides) {
    if (!epivKeys.includes(key)) {
      throw new Error(`Override icon error (${value}): Key "${key}" does not exist in @element-plus/icons-vue.`)
    }
  }

  const content = []
  content.push('/* eslint-disable perfectionist/sort-named-exports */')
  customs.forEach((value, key) => content.push(`import ${key} from './${value}'`))
  overrides.forEach((value, key) => content.push(`import ${key} from './${value}'`))
  content.push(``)

  content.push(`export {`)
  customs.forEach((_, key) => content.push(`  ${key},`))
  overrides.forEach((_, key) => content.push(`  ${key},`))
  content.push(`}`)
  content.push(``)

  content.push('export const __customs = {')
  customs.forEach((_, key) => content.push(`  ${key},`))
  content.push(`}`)
  content.push(``)

  content.push('export const __overrides = {')
  overrides.forEach((_, key) => content.push(`  ${key},`))
  content.push(`}`)
  content.push(``)

  const epExports = epivKeys.filter(key => !overrides.has(key)).reduce((acc, cur) => `${acc} ${cur},`, 'export {')
  content.push(`${epExports} } from '@element-plus/icons-vue'`, '')

  const output = path.join(root, 'index.ts')
  fs.writeFileSync(output, content.join('\n'))
  console.log(`# created icon index file: ${output}`)
}

export default defineConfig(async () => {
  await buildIndex()
  return {
    entry: ['./src/index.ts'],
    platform: 'neutral',
    sourcemap: true,
    dts: {
      vue: true,
    },
    plugins: [
      Vue({
        isProduction: true,
      }),
    ],
  } satisfies UserConfig
})
