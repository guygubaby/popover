import { defineConfig } from '@bryce-loskie/vueup'

export default defineConfig({
  entry: 'src/index.ts',
  external: ['vue', '@bryce-loskie/popperjs'],
  include: [
    './src/**/*.vue',
    './src/**/*.ts',
  ],
})
