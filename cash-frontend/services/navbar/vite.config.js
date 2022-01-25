const { join, resolve } = require('path');
const { readFileSync } = require('fs');
import { defineConfig, loadEnv } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import VueI18n from '@intlify/vite-plugin-vue-i18n';
import ViteFonts from 'vite-plugin-fonts';

const envPrefix = 'CLIENT_';
const projectRoot = join(__dirname, '../../../');
const appRoot = join(__dirname, './');
const srcRoot = resolve(__dirname, './src');

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), envPrefix) };

  return defineConfig({
    rollupOptions: {
      input: 'src/main.ts',
      format: 'system',
      preserveEntrySignatures: true,
    },
    base: './',
    envDir: appRoot,
    envPrefix,

    resolve: {
      extensions: ['.js', '.ts', '.vue', '.json'],
      alias: {
        '@': srcRoot,
      },
    },

    server: {
      https: {
        key: readFileSync(resolve(projectRoot, './ssl/ssl.key')),
        cert: readFileSync(resolve(projectRoot, './ssl/ssl.crt')),
      },
      port: process.env.CLIENT_PORT || 3001,
    },

    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       // example : additionalData: `@import "./src/design/styles/variables";`
    //       // dont need include file extend .scss
    //       additionalData: `@import "./src/scss/element-plus";`,
    //     },
    //   },
    // },

    optimizeDeps: {
      include: ['vue', 'vue-router'],
    },

    plugins: [
      Vue({
        refTransform: [/src/],
        template: {
          transformAssetUrls: {
            base: '/src',
          },
        },
      }),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'vuex',
          'vue-i18n',
          {
            'vue-router': [
              'createRouter',
              'createWebHistory',
              'createWebHashHistory',
            ],
            axios: [
              ['default', 'axios'], // import { default as axios } from 'axios',
            ],
            ramda: ['propEq', 'find'],
          },
        ],
        resolvers: [ElementPlusResolver()],
        dts: 'src/auto-imports.d.ts',
      }),

      // https://github.com/antfu/unplugin-vue-components
      Components({
        // allow auto load components under `./src/components/`
        extensions: ['vue'],

        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/],

        // custom resolvers
        resolvers: [
          // auto import icons
          // https://github.com/antfu/unplugin-icons
          IconsResolver({
            // componentPrefix: '',
            enabledCollections: ['carbon'],
          }),
          ElementPlusResolver({
            importStyle: 'sass',
            ssr: true,
          }),
        ],

        dts: 'src/components.d.ts',
      }),

      // https://github.com/antfu/unplugin-icons
      Icons({
        autoInstall: true,
        compiler: 'vue3',
      }),

      // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        include: [resolve(appRoot, './locales/**')], //resolve(srcRoot, './i18n/**')
      }),

      ViteFonts({
        google: {
          families: ['Open Sans'],
        },
      }),
    ],
  });
};
