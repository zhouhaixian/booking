import { Outlet } from '@umijs/max';
import { ConfigProvider } from 'antd';
import locale from 'antd/es/locale/zh_CN';

export default () => (
  <ConfigProvider locale={locale}>
    <Outlet />
  </ConfigProvider>
);
