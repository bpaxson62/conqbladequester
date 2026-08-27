/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  extends: ['@electron-toolkit/eslint-config-ts/eslint-recommended', 'plugin:vue/vue3-recommended'],
  rules: {
    'vue/require-default-prop': 'off',
    'vue/multi-word-component-names': 'off'
  }
}
