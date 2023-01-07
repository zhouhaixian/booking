import ConfigPane from '@/components/ConfigPane';
import RegisterPane from '@/components/RegisterPane';
import { RegisterPayload } from '@/types';
import { ProCard, StepsForm } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { message, Typography } from 'antd';
import { isNil } from 'lodash';
import { useEffect } from 'react';
import './index.less';

type RegisterData = { 'password-repeat'?: string } & RegisterPayload;

export default function WelcomePage() {
  const { register, hasAdmin, login } = useModel(
    '@@initialState',
    (model) => model.initialState,
  ) as any;
  const { config, setConfig } = useModel('configs');

  useEffect(() => {
    if (hasAdmin && !isNil(config)) {
      history.push('/');
      window.location.reload();
    }
  });

  return (
    <ProCard style={{ width: 'auto', padding: '5rem' }}>
      <Typography.Title
        level={3}
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        系统初始化
      </Typography.Title>
      <StepsForm current={hasAdmin ? 1 : 0}>
        <StepsForm.StepForm
          name="register"
          title="注册管理员账号"
          stepProps={{
            description: '获取管理员权限',
          }}
          onFinish={async (values) => {
            const payload = values as RegisterData;
            if (payload.password !== payload['password-repeat']) {
              message.error('两次输入的密码不一致');
              return false
            }
            delete payload['password-repeat'];
            try {
              await register(payload);
              await login({ id: payload.id, password: payload.password });
              window.location.reload();
            } catch (e: any) {
              if (e.response.data.message === 'user already exists') {
                message.error('用户已存在');
              } else {
                message.error('注册失败');
                message.error(e.response.data.message);
              }
            }
            return false;
          }}
        >
          <RegisterPane />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="config"
          title="配置系统"
          stepProps={{
            description: '配置提示信息以及其他系统参数',
          }}
          onFinish={async (values) => {
            setConfig(values as any);
            window.location.reload();
          }}
        >
          <ConfigPane />
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
  );
}
