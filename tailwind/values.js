import defaultThemeFactory from 'tailwindcss/defaultTheme'

import config from './config'

const { theme } = config

const defaultTheme = defaultThemeFactory
const { colors: defaultColors } = defaultTheme
const overwrittenColors = theme.colors
const usedColors = overwrittenColors || defaultColors
const extendedColors = (theme.extend && theme.extend.colors)

export const colors = { ...usedColors, ...extendedColors }
