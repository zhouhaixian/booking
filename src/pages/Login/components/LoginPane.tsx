import { useModel } from '@umijs/max';
import { MobileOutlined, LockOutlined } from '@ant-design/icons';
import { ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';

export default function LoginPane() {
  const forgot_password_message = useModel(
    'configs',
    (model) => model.config?.forgot_password_message ?? '',
  );

  return (
    <>
      <ProFormText
        name={'phone'}
        placeholder={'手机号'}
        fieldProps={{
          size: 'large',
          prefix: <MobileOutlined className="prefixIcon" />,
        }}
        rules={[
          {
            required: true,
            message: '请输入手机号！',
          },
          {
            pattern: /^1\d{10}$/,
            message: '手机号格式错误！',
          },
        ]}
      />
      <ProFormText.Password
        name={'password'}
        placeholder={'密码'}
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined className="prefixIcon" />,
        }}
        rules={[
          {
            required: true,
            message: '请输入密码！',
          },
        ]}
      />
      <a
        style={{ float: 'right', paddingBottom: 10 }}
        onClick={() => message.info(forgot_password_message)}
      >
        忘记密码?
      </a>
    </>
  );
}
