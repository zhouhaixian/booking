// 运行时配置

import { API_DOMAIN } from '@booking/configs';
import { UserInfo } from '@booking/types';
import * as max from '@umijs/max';
import { history, RequestConfig, RunTimeLayoutConfig } from '@umijs/max';
import { message } from 'antd';
import User from './components/User';
import { LoginPayload, RegisterPayload } from './types';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState() {
  let token = localStorage.getItem('token');
  let user: UserInfo | null = null;
  let hasAdmin = false;

  function setUser(newUser: UserInfo | null) {
    user = newUser;
  }

  function setToken(newToken: string | null) {
    token = newToken;
    if (token === null) {
      localStorage.removeItem('token');
    } else {
      localStorage.setItem('token', token);
    }
  }

  function register(payload: RegisterPayload) {
    return max.request('/users/register', { method: 'POST', data: payload });
  }

  async function login(payload: LoginPayload) {
    const {
      data: { token },
    } = await max.request('/auth/login', {
      method: 'POST',
      data: payload,
    });
    setToken(token);
  }

  async function update(id: string, payload: Partial<UserInfo>) {
    const { data } = await max.request('/users/'.concat(id), {
      method: 'PATCH',
      data: payload,
    });
    setUser(data);
  }

  function deleteAccount(id: string) {
    return max.request('/users/'.concat(id), { method: 'DELETE' });
  }

  function logout() {
    setUser(null);
    setToken(null);
    history.push('/');
  }

  if (token !== null) {
    try {
      const { data } = await max.request('/users/info');
      if (data !== undefined) setUser(data as UserInfo);
    } catch {
      setToken(null);
    }
  }

  try {
    const { data } = await max.request('/users/has-admin');
    hasAdmin = data;
  } catch {}

  return {
    token,
    user,
    hasAdmin,
    register,
    login,
    logout,
    update,
    deleteAccount,
  };
}

export const layout: RunTimeLayoutConfig = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    rightRender(initialState) {
      const { user, logout } = initialState as any;
      if (user !== null) {
        return (
          <User
            name={user.name}
            logout={() => {
              logout();
              location.reload();
            }}
          />
        );
      } else {
        return <></>;
      }
    },
  };
};

export const request: RequestConfig = {
  timeout: 30000,
  errorConfig: {
    errorHandler: (error: any) => {
      message.info(error.message);
    },
  },
  requestInterceptors: [
    (config: any) => {
      const url = API_DOMAIN.concat(config.url);
      return { ...config, url };
    },
  ],
  headers: { authorization: `bearer ${localStorage.getItem('token')}` },
};
