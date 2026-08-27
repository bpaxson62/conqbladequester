/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  extends: ['plugin:vue/vue3-recommended', '@electron-toolkit/eslint-config-ts/recommended'],
  // `plugin:vue/vue3-recommended` sets vue-eslint-parser as the root parser
  // for .vue files internally, but the electron-toolkit config applied
  // after it sets a top-level `parser: '@typescript-eslint/parser'` that
  // would otherwise clobber that for .vue files. This override re-asserts
  // vue-eslint-parser for .vue files specifically, delegating the <script>
  // block to the TS parser so `lang="ts"` SFCs parse correctly.
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    }
  ],
  rules: {
    'vue/require-default-prop': 'off',
    'vue/multi-word-component-names': 'off'
  }
}
