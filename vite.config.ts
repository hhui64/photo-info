import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { fileURLToPath } from 'node:url'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    strictPort: true
  },
  resolve: {
    alias: {
      '@': path.resolve(fileURLToPath(import.meta.url), './src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  plugins: [
    vue(),
    eslint({
      cache: true
    }),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/typings/auto-imports.d.ts'
    }),
    Components({
      dts: 'src/typings/components.d.ts',
      resolvers: [
        AntDesignVueResolver({ importStyle: 'less', resolveIcons: true }),
        (componentName) => {
          switch (componentName) {
            case 'AApp':
              return { name: 'App', from: 'ant-design-vue/es' }
            default:
              return undefined
          }
        }
      ],
      allowOverrides: true
    })
  ]
})
