import { FlatCompat } from '@eslint/eslintrc'

// Crie um compatível instância
const compat = new FlatCompat()

export default [
  ...compat.config({
    extends: './.eslintrc.json',
  }),
]
