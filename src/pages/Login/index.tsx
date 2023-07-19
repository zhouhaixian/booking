import { SCHOOL, TITLE } from '../../configs';
import { LoginForm } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { message, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import LoginPane from './components/LoginPane';
import RegisterPane from '../../components/RegisterPane';
import { Action, LoginData, RegisterData } from './types';

export default function LoginPage() {
  const [action, setAction] = useState<Action>('login');
  const { login, register, user } = useModel('@@initialState', model => model.initialState) as any;

  useEffect(() => {
    if (user !== null) history.push('/');
  });

  async function submit(data: LoginData | RegisterData) {
    if (action === 'login') {
      try {
        await login(data);
        location.reload();
      } catch {
        message.error('账号或密码错误');
      }
    } else if (action === 'register') {
      const payload = data as RegisterData;
      if (payload.password !== payload['password-repeat']) {
        message.error('两次输入的密码不一致');
        return false;
      }
      delete payload['password-repeat'];
      try {
        await register(payload);
        setAction('login');
        message.success('注册成功，请登录');
      } catch (e: any) {
        if (e.response.data.message === 'user already exists') {
          message.error('用户已存在');
        } else {
          message.error('注册失败');
          message.error(e.response.data.message);
        }
      }
    }
  }

  return (
    <div
      style={{
        paddingTop: '10vh',
      }}
    >
      <LoginForm title={TITLE} subTitle={SCHOOL} onFinish={submit}>
        <Tabs centered activeKey={action} onChange={setAction as any}>
          <Tabs.TabPane key={'login'} tab={'登录'} />
          <Tabs.TabPane key={'register'} tab={'注册'} />
        </Tabs>
        {action === 'login' && <LoginPane />}
        {action === 'register' && <RegisterPane />}
      </LoginForm>
    </div>
  );
}
