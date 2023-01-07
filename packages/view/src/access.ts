import { Role, UserInfo } from '@booking/types';

export default (initialState: { user: UserInfo | null }) => {
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://next.umijs.org/docs/max/access
  const { user } = initialState;
  let isAdmin = false;
  if (user !== null) {
    isAdmin = user.role === Role.Admin;
  }

  return { isAdmin };
};
