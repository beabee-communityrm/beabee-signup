import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueI18n from '@intlify/vite-plugin-vue-i18n';
import pages from 'vite-plugin-pages';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

  return defineConfig({
    plugins: [
      vue(),
      vueI18n({
        include: path.resolve(__dirname, './locales/*'),
      }),
      pages(),
    ],
    server: {
      proxy: {
        '^/api': {
          target: 'http://localhost:8000',
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  });
};
