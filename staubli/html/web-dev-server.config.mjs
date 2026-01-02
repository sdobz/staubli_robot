import { esbuildPlugin } from '@web/dev-server-esbuild';
import proxy from 'koa-proxies';

export default {
  appIndex: '/index.html',
  port: 8008,
  middleware: [
    proxy('/api/', {
      target: 'http://localhost:8000/',
    }),
  ],
  watch: true,
  nodeResolve: true,
  plugins: [
    esbuildPlugin({ ts: true, target: 'es2022' })
  ],
};
