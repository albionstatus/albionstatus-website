import defaultThemeFactory from 'tailwindcss/defaultTheme'

import config from './config'

const { theme } = config

const defaultTheme = defaultThemeFactory
const { colors: defaultColors } = defaultTheme
const { colors: overwrittenColors, extend } = theme
const usedColors = overwrittenColors || defaultColors
const extendedColors = extend && extend.colors

export const colors = { ...usedColors, ...extendedColors }
