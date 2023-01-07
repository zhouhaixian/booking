import { TITLE } from '@booking/configs';
import { defineConfig } from '@umijs/max';
import routes from './src/routes';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {
    dataField: 'data' as any,
  },
  layout: {
    title: TITLE,
    locale: false,
  },
  legacy: {},
  npmClient: 'pnpm',
  ...routes,
});
