import { defineConfig } from '@umijs/max';

export default defineConfig({
  routes: [
    {
      path: '/',
      wrappers: ['@/wrappers/auth', '@/wrappers/init', '@/wrappers/locale'],
      redirect: '/booking',
    },
    {
      path: '*',
      wrappers: ['@/wrappers/auth', '@/wrappers/init', '@/wrappers/locale'],
      component: './404',
    },
    {
      name: '登录',
      path: '/login',
      component: './Login',
      wrappers: ['@/wrappers/init', '@/wrappers/locale'],
      menuRender: false,
      headerRender: false,
      footerRender: false,
      menuHeaderRender: false,
      hideInMenu: true,
      hideInBreadcrumb: true,
    },
    {
      name: '初始化',
      path: '/welcome',
      component: './Welcome',
      menuRender: false,
      headerRender: false,
      footerRender: false,
      menuHeaderRender: false,
      hideInMenu: true,
      hideInBreadcrumb: true,
      wrappers: ['@/wrappers/locale'],
    },
    {
      name: '预约登记',
      path: '/booking',
      wrappers: ['@/wrappers/auth', '@/wrappers/init', '@/wrappers/locale'],
      component: './Booking',
      icon: 'CalendarOutlined',
    },
    {
      name: '预约记录',
      path: '/record',
      wrappers: ['@/wrappers/auth', '@/wrappers/init', '@/wrappers/locale'],
      component: './Record',
      icon: 'ReconciliationOutlined',
    },
    {
      name: '用户列表',
      path: '/users',
      wrappers: ['@/wrappers/auth', '@/wrappers/init', '@/wrappers/locale'],
      component: './Users',
      access: 'isAdmin',
      icon: 'UserOutlined',
    },
    {
      name: '配置中心',
      path: '/config',
      wrappers: ['@/wrappers/auth', '@/wrappers/init', '@/wrappers/locale'],
      component: './Config',
      access: 'isAdmin',
      icon: 'ControlOutlined',
    },
  ],
});
